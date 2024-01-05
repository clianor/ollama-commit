#!/usr/bin/env node

import { MODEL, PROVIDER, SIGNATURE, VERBOSE } from "./config";
import { checkGitRepository } from "./utils/checkGitRepository";
import { getDiff } from "./utils/getDiff";
import { createCommit } from "./utils/createCommit";
import { confirmContinue } from "./utils/confirmContinue";
import { generateCommitMessage } from "./utils/generateCommitMessage";
import { pullModel } from "./utils/pullModel";
import { convertMessageToCommitFormat } from "./utils/convertMessage";

if (!VERBOSE) {
  console.debug = function () {};
}

console.debug("COMMIT PROVIDER", PROVIDER);
console.debug("COMMIT MODEL", MODEL, "\n");

const main = async () => {
  checkGitRepository();
  const diff = getDiff();
  await pullModel();
  console.log();
  console.debug("\n========= prompting ollama... =========\n");
  let message = await generateCommitMessage(diff);
  message = convertMessageToCommitFormat(message);
  if (SIGNATURE) message += "\n\nmade by ollama-commit";
  console.debug("\n========= result =========\n");
  console.log(message);
  console.debug("\n========= prompting ai done! =========");
  const isContinue = await confirmContinue();
  if (!isContinue) {
    console.log("Commit aborted by user 🙅‍♂️");
    process.exit(1);
  }
  createCommit(message);
  process.exit();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
