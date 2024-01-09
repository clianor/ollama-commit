#!/usr/bin/env node

import { checkGitRepository } from "./utils/checkGitRepository";
import { getDiff } from "./utils/getDiff";
import { createCommit } from "./utils/createCommit";
import { confirmContinue } from "./utils/confirmContinue";
import { generateCommitMessage } from "./utils/generateCommitMessage";
import { pullModel } from "./utils/pullModel";
import { convertMessageToCommitFormat } from "./utils/convertMessage";
import options from "./options";
import { PROVIDER } from "./constants";
import logger from "./utils/logger";

const main = async () => {
  logger.debug("COMMIT PROVIDER", PROVIDER);
  logger.debug("COMMIT MODEL", options.model, "\n");

  checkGitRepository();
  const diff = getDiff();
  await pullModel();
  logger.debug("========= prompting ollama... =========");
  let message = await generateCommitMessage(diff);
  message = convertMessageToCommitFormat(message);
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
