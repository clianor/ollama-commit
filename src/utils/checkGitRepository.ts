import { execSync } from "child_process";

import logger from "./logger";

export const checkGitRepository = (): void => {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf8",
      stdio: "ignore",
    });
  } catch (error) {
    logger.warn("This is not a git repository");
    process.exit(1);
  }
};
