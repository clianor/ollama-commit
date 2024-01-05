import { API_HOST, MODEL, VERBOSE } from "../config";
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
      temperature: 0,
      num_ctx: 4096,
      top_k: 20,
      top_p: 0.4,
    },
  })) {
    if (VERBOSE) process.stdout.write(token);
    content += token;
  }
  console.debug("\n\n");

  return removeEscapeCharacters(content);
};
