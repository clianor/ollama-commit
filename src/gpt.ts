import { SingleBar } from "cli-progress";
import { MODEL, PROVIDER } from "./config";
import { defaultPromptTemplate } from "./template";

export const generateCommit = async (diff: string): Promise<string> => {
  const { Ollama } = await import("ollama");
  const ollama = new Ollama();

  // 1. ollama model pulling
  const it = await ollama.pull(MODEL);
  let pullingResult = await it.next();
  if (!pullingResult.done) {
    pullingResult = await it.next();

    const progressBar = new SingleBar({
      format:
        `${PROVIDER} - ${MODEL} pulling |` +
        "{bar}" +
        "| {percentage}% || {value}/{total} Chunks",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    });

    progressBar.start(pullingResult.value.total, pullingResult.value.completed);
    while (
      !pullingResult.done &&
      pullingResult.value.total !== pullingResult.value.completed
    ) {
      progressBar.increment();
      progressBar.update(pullingResult.value.completed, {
        total: pullingResult.value.total,
      });
      pullingResult = await it.next();
    }
    progressBar.stop();
  }

  // 2. ollama message generate
  console.log("\n========= prompting ollama... =========");

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: diff,
      stream: false,
      template: defaultPromptTemplate,
      options: {
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok)
    throw new Error(`Failed to generate text: ${await response.text()}`);

  const responseJson = await response.json();
  const content = responseJson.response.trim();
  console.log(content);

  console.log("\n========= prompting ai done! =========");

  return content;
};
