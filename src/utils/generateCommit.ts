import { generateCommitMessage, pullModel } from "../helpers";

export const generateCommit = async (diff: string): Promise<string> => {
  await pullModel();
  return generateCommitMessage(diff);
};
