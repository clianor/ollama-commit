export async function confirmContinue() {
  const inquirer = (await import("inquirer")).default as any;
  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Do you want to continue?",
      default: false,
    },
  ]);
  return !!answer.continue;
}
