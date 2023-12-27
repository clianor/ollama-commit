import { SIGNATURE } from "./config";
import { generateCommitMessage, pullModel } from "./helpers";

export const generateCommit = async (diff: string): Promise<string> => {
  await pullModel();
  let message = await generateCommitMessage(diff);
  if (SIGNATURE) message += "\n\nmade by ollama-commit";
  return message;
};
