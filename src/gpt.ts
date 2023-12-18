import { Ollama } from "ollama";
import { SingleBar } from "cli-progress";
import { MODEL, PROVIDER } from "./config";

export const generateCommit = async (diff: string): Promise<string> => {
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

  // 아래의 토픽에 대해 설명해줘.
  // 내가 제공하는 git diff 를 통해 얻은 코드의 변경점을 통해서 "Udacity Git Convention"에 따른 깃 커밋 메시지를 작성하길 원해
  const prompt = `
  "---" "Write a git commit message following the "Udacity Git Convention" based on the changes obtained through the git diff.
  Please follow the options below.
  
  - Tone: Rude
  - Style: Exactly
  - Reader level: Expert
  - Length: In one sentence
  - Perspective: Developer
  - Format :
    - [Type]: [Subject]
    - Description
  - Answer me in English
  - Just tell me the conclusionn
  ---
  1. Write the commit message following the template:
    - [Type]: [Subject]
    - Description
  2. Examples:
   - feat: Added new package.json file with project dependencies.
   - chore: Created src/git.ts file for handling git operations.
  
  The diffs are below:
  ${diff}
  `.trim();

  let content = "";
  for await (const token of ollama.generate(MODEL, prompt)) {
    process.stdout.write(token);
    content += token;
  }

  console.log("\n========= prompting ai done! =========");

  return content;
};
