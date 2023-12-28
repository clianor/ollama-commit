#!/usr/bin/env node

import { MODEL, PROVIDER, SIGNATURE } from "./config";
import { generateCommit } from "./utils/generateCommit";
import { checkGitRepository } from "./utils/checkGitRepository";
import { getDiff } from "./utils/getDiff";
import { createCommit } from "./utils/createCommit";
import { confirmContinue } from "./utils/confirmContinue";

console.log("COMMIT PROVIDER", PROVIDER);
console.log("COMMIT MODEL", MODEL, "\n");

const main = async () => {
  checkGitRepository();
  const diff = getDiff();
  let message = await generateCommit(diff);
  console.log("\n========= prompting ollama... =========\n");
  console.log(message);
  if (SIGNATURE) message += "\n\nmade by ollama-commit";
  console.log("\n========= prompting ai done! =========");
  const isContinue = await confirmContinue();
  if (!isContinue) {
    console.log("Commit aborted by user 🙅‍♂️");
    process.exit(1);
  }
  createCommit(message);
};

main().catch((error) => console.error(error));
