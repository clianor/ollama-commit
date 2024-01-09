#!/usr/bin/env node

import { confirmContinue } from "./utils/confirm-continue";
import { convertMessageToCommitFormat } from "./utils/convert-message-to-commit-format";
import options from "./options";
import { PROVIDER } from "./constants";
import logger from "./utils/logger";
import { ollamaPropt } from "./ollama";
import { isGitRepository, getDiff, createCommit } from "./git";

async function main() {
  logger.debug("COMMIT PROVIDER", PROVIDER);
  logger.debug("COMMIT MODEL", options.model, "\n");

  if (!isGitRepository()) {
    logger.warn("This is not a git repository");
    process.exit(1);
  }

  const diff = getDiff();
  const promptResponse = await ollamaPropt(diff);
  let commitMessage = convertMessageToCommitFormat(promptResponse);
  if (options.signature) commitMessage += "\n\nmade by ollama-commit";
  process.stdout.write(`========= result =========\n`);
  process.stdout.write(`${commitMessage}\n`);

  const isContinue = await confirmContinue();
  if (!isContinue) {
    process.stdout.write("Commit aborted by user 🙅‍♂️\n");
    process.exit(1);
  }
  createCommit(commitMessage);
  process.exit();
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
