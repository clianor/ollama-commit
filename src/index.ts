import inquirer from "inquirer";
import { generateCommit } from "./gpt";
import { checkGitRepository, createCommit, getDiff } from "./git";
import { MODEL, PROVIDER } from "./config";

console.log("COMMIT PROVIDER", PROVIDER);
console.log("COMMIT MODEL", MODEL);

const main = async () => {
  checkGitRepository();

  const diff = getDiff();

  const message = await generateCommit(diff);

  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Do you want to continue?",
      default: true,
    },
  ]);

  if (!answer.continue) {
    console.log("Commit aborted by user 🙅‍♂️");
    process.exit(1);
  }

  createCommit(message);
};

await main().catch((error) => console.error(error));
