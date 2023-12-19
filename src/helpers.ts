import { defaultPromptTemplate } from "./template";

export const getArgs = () => {
  const args = process.argv.slice(2);
  const result: Record<string, any> = {};

  while (args.length > 0) {
    const [key, value] = args.splice(0, 2);
    if (key.includes("--")) result[key.replace("--", "")] = value;
  }

  return result;
};

export const getPrompt = (diff: string): string => {
  return defaultPromptTemplate.replace(
    "{{diff}}",
    ["```", diff, "```"].join("\n")
  );
};
