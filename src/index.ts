#!/usr/bin/env node

import { translateAndFormatCommitMessage } from "./utils/translate-and-format-commit-message";
import options from "./options";
import { PROVIDER } from "./constants/config";
import logger from "./utils/logger";
import { ollamaPrompt } from "./ollama";
import { checkGitRepository, createCommit, getDiff } from "./git";
import { getTokenCount } from "./utils/get-token-count";

async function main() {
  logger.info(`AI PROVIDER: ${PROVIDER}`);
  logger.info(`AI MODEL: ${options.model}`);
  logger.info(`API HOST: ${options.api}`);
  logger.info(`LANGUAGE: ${options.language}`);

  checkGitRepository();

  const diff = getDiff(+options.maxDiffLength);
  const tokenCount = await getTokenCount(diff);
  logger.start(
    `The currently prepared commit diff is ${tokenCount.toLocaleString()} tokens.`
  );
  logger.start("Generating commit message...\n");

  const startTime = Date.now();
  const promptResult = await ollamaPrompt(diff);
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;

  let commitMessage = await translateAndFormatCommitMessage(promptResult);
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
