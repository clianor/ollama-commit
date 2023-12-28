import { execSync } from "child_process";

export const checkGitRepository = (): void => {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf8",
      stdio: "ignore",
    });
  } catch (error) {
    console.error("This is not a git repository");
    process.exit(1);
  }
};
