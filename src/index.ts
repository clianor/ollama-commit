#!/usr/bin/env node

import { convertMessageToCommitFormat } from "./utils/convert-message-to-commit-format";
import options from "./options";
import { PROVIDER } from "./constants";
import logger from "./utils/logger";
import { ollamaPrompt } from "./ollama";
import { checkGitRepository, createCommit, getDiff } from "./git";

async function main() {
  logger.info(`AI PROVIDER: ${PROVIDER}`);
  logger.info(`AI MODEL: ${options.model}`);
  logger.info(`API HOST: ${options.api}`);
  logger.info(`LANGUAGE: ${options.language}`);

  checkGitRepository();

  const diff = getDiff(+options.maxDiffLength);
  logger.start(
    `The currently prepared commit diff is ${Intl.NumberFormat("en-US").format(
      diff.length
    )} characters long.`
  );
  logger.start("Generating commit message...\n");

  const startTime = Date.now();
  const promptResponse = await ollamaPrompt(diff);
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;

  let commitMessage = await convertMessageToCommitFormat(promptResponse);
  if (options.signature) commitMessage += "\n\nmade by ollama-commit";
  logger.success(`✅ Commit message generation successful!`);
  logger.success(`🚀 Generating commit message took ${duration} seconds.\n`);
  process.stdout.write(`${commitMessage}\n`);

  const isContinue = await logger.prompt("Do you want to continue?", {
    type: "confirm",
    initial: true,
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
