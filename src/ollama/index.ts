import { SYSTEM_MESSAGE } from "../constants/prompt";
import options from "../options";
import { removeEscapeCharacters } from "../utils/remove-escape-characters";

export async function ollamaPropt(diff: string) {
  const { Ollama } = await import("ollama");
  const ollama = new Ollama({
    address: options.api,
  });

  const chunks: string[] = [];
  for await (const token of ollama.generate(options.model, diff, {
    system: SYSTEM_MESSAGE,
    parameters: {
      temperature: 0,
      num_ctx: 4096,
      top_k: 20,
      top_p: 0.4,
    },
  })) {
    if (options.verbose) process.stdout.write(token);
    chunks.push(token);
  }
  if (options.verbose) process.stdout.write("\n");
  return removeEscapeCharacters(chunks.join(""));
}
