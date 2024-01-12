import { execSync } from "child_process";
import logger from "../utils/logger";

export function checkGitRepository() {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf8",
      stdio: "ignore",
    });
  } catch (error) {
    throw error;
  }
}

export function getDiff(maxDiffLength: number) {
  const diff = execSync(
    "git diff --cached . ':(exclude)package-lock.json' ':(exclude)yarn.lock' ':(exclude)pnpm-lock.yaml'"
  ).toString();

  if (!diff) {
    logger.warn(
      "No staged changes found. Make sure there are changes and run `git add .` or use the `--auto-add-all`, `-a` option."
    );
    process.exit(1);
  }

  if (diff.length > maxDiffLength) {
    logger.warn(
      `The diff is too large (${diff.length} > ${maxDiffLength} chars) to write a commit message. Please consider splitting your changes into multiple commits.`
    );
    process.exit(1);
  }

  return diff;
}

export const createCommit = (message: string) => {
  execSync(`git commit -F -`, { input: message });
};
