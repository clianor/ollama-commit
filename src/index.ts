#!/usr/bin/env node

import { MODEL, PROVIDER, SIGNATURE } from "./config";
import { checkGitRepository } from "./utils/checkGitRepository";
import { getDiff } from "./utils/getDiff";
import { createCommit } from "./utils/createCommit";
import { confirmContinue } from "./utils/confirmContinue";
import { generateCommitMessage } from "./utils/generateCommitMessage";
import { pullModel } from "./utils/pullModel";
import { convertMessageToCommitFormat } from "./utils/convertMessage";

console.log("COMMIT PROVIDER", PROVIDER);
console.log("COMMIT MODEL", MODEL, "\n");

const main = async () => {
  checkGitRepository();
  const diff = getDiff();
  await pullModel();
  let message = await generateCommitMessage(diff);
  console.log("\n========= prompting ollama... =========\n");
  message = convertMessageToCommitFormat(message);
  if (SIGNATURE) message += "\n\nmade by ollama-commit";
  console.log(message);
  console.log("\n========= prompting ai done! =========");
  const isContinue = await confirmContinue();
  if (!isContinue) {
    console.log("Commit aborted by user 🙅‍♂️");
    process.exit(1);
  }
  createCommit(message);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
