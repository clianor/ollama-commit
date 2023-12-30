import { API_HOST, MODEL } from "../config";
import { defaultSystemMessage } from "../constants/prompt";
import { removeEscapeCharacters } from "./removeEscapeCharacters";

export const generateCommitMessage = async (diff: string) => {
  const { Ollama } = await import("ollama");
  const ollama = new Ollama({
    address: API_HOST,
  });

  let content = "";
  for await (const token of ollama.generate(MODEL, diff, {
    system: defaultSystemMessage,
    parameters: {
      temperature: 0.9,
      top_k: 100,
      top_p: 0.9,
    },
  })) {
    process.stdout.write(token);
    content += token;
  }

  return removeEscapeCharacters(content);
};
