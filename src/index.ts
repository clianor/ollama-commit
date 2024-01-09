#!/usr/bin/env node

import { checkGitRepository } from "./utils/checkGitRepository";
import { getDiff } from "./utils/getDiff";
import { createCommit } from "./utils/createCommit";
import { confirmContinue } from "./utils/confirmContinue";
import { convertMessageToCommitFormat } from "./utils/convertMessage";
import options from "./options";
import { PROVIDER } from "./constants";
import logger from "./utils/logger";
import { ollamaPropt } from "./ollama";

const main = async () => {
  logger.debug("COMMIT PROVIDER", PROVIDER);
  logger.debug("COMMIT MODEL", options.model, "\n");

  checkGitRepository();
  const diff = getDiff();
  logger.debug("========= prompting ollama... =========");
  const promptResponse = await ollamaPropt(diff);
  let message = convertMessageToCommitFormat(promptResponse);
  if (options.signature) message += "\n\nmade by ollama-commit";
  logger.debug("========= result =========");
  process.stdout.write(`${message}\n`);
  logger.debug("========= prompting ai done! =========");
  const isContinue = await confirmContinue();
  if (!isContinue) {
    process.stdout.write("Commit aborted by user 🙅‍♂️\n");
    process.exit(1);
  }
  createCommit(message);
  process.exit();
};

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
