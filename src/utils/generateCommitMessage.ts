import { MODEL } from "../config";
import { defaultSystemMessage } from "../prompt";

export const generateCommitMessage = async (diff: string) => {
  const options = { temperature: 0.9, top_k: 500, top_p: 0.9 };

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt: diff,
      stream: false,
      system: defaultSystemMessage,
      options,
    }),
  });

  if (!response.ok)
    throw new Error(`Failed to generate text: ${await response.text()}`);

  const responseJson = await response.json();
  return responseJson.response.trim();
};
