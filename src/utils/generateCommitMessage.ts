import options from "../options";
import { defaultSystemMessage } from "../constants/prompt";
import { removeEscapeCharacters } from "./removeEscapeCharacters";

export const generateCommitMessage = async (diff: string) => {
  const { Ollama } = await import("ollama");
  const ollama = new Ollama({
    address: options.api,
  });

  let content = "";
  for await (const token of ollama.generate(options.model, diff, {
    system: defaultSystemMessage,
    parameters: {
      temperature: 0,
      num_ctx: 4096,
      top_k: 20,
      top_p: 0.4,
    },
  })) {
    if (options.verbose) process.stdout.write(token);
    content += token;
  }
  console.debug("\n\n");

  return removeEscapeCharacters(content);
};
