import { SYSTEM_MESSAGE } from "../constants/prompt";
import options from "../options";
import { removeEscapeCharacters } from "../utils/remove-escape-characters";

type OllamaParams = {
  model: string;
  prompt: string;
  system?: string;
  options?: {
    temperature?: number;
    num_ctx?: number;
    top_k?: number;
    top_p?: number;
  };
};

export async function ollamaPropt(diff: string) {
  const body: OllamaParams = {
    model: options.model,
    prompt: diff,
    system: SYSTEM_MESSAGE,
    options: {
      temperature: 0,
      num_ctx: 4096,
      top_k: 20,
      top_p: 0.4,
    },
  };

  const response = await fetch(`${options.api}/api/generate`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Failed to read response body");
  }
  let content = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const rawjson = new TextDecoder().decode(value);
    const json = JSON.parse(rawjson);

    if (json.done === false) {
      if (options.verbose) process.stdout.write(json.response);
      content += json.response;
    }
  }
  if (options.verbose) process.stdout.write("\n\n");
  return removeEscapeCharacters(content);
}
