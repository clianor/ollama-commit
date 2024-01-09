import { execSync } from "child_process";

export function isGitRepository() {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf8",
      stdio: "ignore",
    });
    return true;
  } catch (error) {
    return false;
  }
}
