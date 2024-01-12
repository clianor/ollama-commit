#!/usr/bin/env node

import { convertMessageToCommitFormat } from "./utils/convert-message-to-commit-format";
import options from "./options";
import { PROVIDER } from "./constants";
import logger from "./utils/logger";
import { ollamaPropt } from "./ollama";
import { checkGitRepository, getDiff, createCommit } from "./git";

async function main() {
  logger.info(`COMMIT PROVIDER: ${PROVIDER}`);
  logger.info(`COMMIT MODEL: ${options.model}\n`);

  checkGitRepository();

  const diff = getDiff();
  logger.start("Generating commit message...\n");
  const promptResponse = await ollamaPropt(diff);
  let commitMessage = convertMessageToCommitFormat(promptResponse);
  if (options.signature) commitMessage += "\n\nmade by ollama-commit";
  logger.success(`✅ Commit message generation successful!\n`);
  process.stdout.write(`${commitMessage}\n\n`);

  const isContinue = await logger.prompt("Do you want to continue?", {
    type: "confirm",
    initial: false,
  });
  if (!isContinue) {
    logger.info("Commit aborted by user 🙅‍♂️\n");
    process.exit(1);
  }
  createCommit(commitMessage);
  process.exit();
}

main().catch((error: Error) => {
  logger.error(error);
  process.exit(1);
});
