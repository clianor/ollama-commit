import { SingleBar } from "cli-progress";

import { MODEL, PROVIDER } from "./config";
import { ARGS_PREFIX } from "./constants";
import { defaultPromptTemplate } from "./template";

export const getArgs = () => {
  const args = process.argv.slice(2);
  return args.reduce((result, arg, index) => {
    if (arg.startsWith(ARGS_PREFIX)) {
      const key = arg.replace(ARGS_PREFIX, "");
      let value: string | boolean = true;
      if (args[index + 1] && !args[index + 1].startsWith(ARGS_PREFIX)) {
        value = args[index + 1];
      }
      result[key] = value;
    }
    return result;
  }, {} as Record<string, any>);
};

export const pullModel = async () => {
  const { Ollama } = await import("ollama");
  const ollama = new Ollama();

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
};

export const generateCommitMessage = async (diff: string) => {
  const options = { temperature: 0.9, top_k: 40, top_p: 0.7 };
  console.log("\n========= prompting ollama... =========");

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt: diff,
      stream: false,
      template: defaultPromptTemplate,
      options,
    }),
  });

  if (!response.ok)
    throw new Error(`Failed to generate text: ${await response.text()}`);

  const responseJson = await response.json();
  let message = responseJson.response.trim();
  console.log(message);

  console.log("\n========= prompting ai done! =========");

  return message;
};
