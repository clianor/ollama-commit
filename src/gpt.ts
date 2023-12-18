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

  const prompt = `
"---" "Write a git commit message following the "Udacity Git Commit Message Style" based on the changes obtained through the git diff.
Please adhere to the following options.

- Tone: Rude
- Style: Precise
- Reader level: Expert
- Length: In one sentence
- Perspective: Developer
- Respond in English
- Just provide the conclusion
---
The Type is contained within the title and can be one of these types:
  - feat: A new feature
  - fix: A bug fix
  - docs: Changes to documentation
  - style: Formatting, missing semi colons, etc; no code change
  - refactor: Refactoring production code
  - test: Adding tests, refactoring test; no production code change
  - chore: Updating build tasks, package manager configs, etc; no production code change


The Subject:
Subjects should be no greater than 50 characters, should begin with a capital letter and do not end with a period.
Use an imperative tone to describe what a commit does, rather than what it did. For example, use change; not changed or changes.


The Body:
Not all commits are complex enough to warrant a body, therefore it is optional and only used when a commit requires a bit of explanation and context.
Use the body to explain the what and why of a commit, not the how.
When writing a body, the blank line between the title and the body is required and you should limit the length of each line to no more than 72 characters.
Additionally, the main body must be brief when explaining the content and reasons and must be written within 72 characters.

Write the commit message following the template:
[Type]: [Subject]
[Body]


Exclude anything unnecessary such as translation. Your entire response will be passed directly into git commit.

The diffs are as follows:
${diff}
  `.trim();

  let content = "";
  for await (const token of ollama.generate(MODEL, prompt)) {
    process.stdout.write(token);
    content += token;
  }

  console.log("\n========= prompting ai done! =========");

  return content.trim();
};
