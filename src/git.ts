import { execSync } from "child_process";

export const createCommit = (message: string) => {
  execSync(`git commit -F -`, { input: message });
};
