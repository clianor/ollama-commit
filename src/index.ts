#!/usr/bin/env node

import { createCommit } from "./git";
import { MODEL, PROVIDER } from "./config";
import { generateCommit } from "./utils/generateCommit";
import { checkGitRepository } from "./utils/checkGitRepository";
import { getDiff } from "./utils/getDiff";

console.log("COMMIT PROVIDER", PROVIDER);
console.log("COMMIT MODEL", MODEL, "\n");

const main = async () => {
  checkGitRepository();

  const diff = getDiff();
  const message = await generateCommit(diff);

  const inquirer = (await import("inquirer")).default as any;
  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Do you want to continue?",
      default: false,
    },
  ]);

  if (!answer.continue) {
    console.log("Commit aborted by user 🙅‍♂️");
    process.exit(1);
  }

  createCommit(message);
};

main().catch((error) => console.error(error));
