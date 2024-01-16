import { SYSTEM_MESSAGE } from "../constants/prompt";
import options from "../options";
import { removeEscapeCharacters } from "../utils/remove-escape-characters";

type OllamaParams = {
  model: string;
  prompt: string;
  system?: string;
  format?: "json";
  options?: {
    mirostat?: number;
    mirostat_eta?: number;
    mirostat_tau?: number;
    num_ctx?: number;
    num_gqa?: number;
    num_gpu?: number;
    num_thread?: number;
    repeat_last_n?: number;
    repeat_penalty?: number;
    temperature?: number;
    tfs_z?: number;
    num_predict?: number;
    top_k?: number;
    top_p?: number;
  };
};

export async function ollamaPrompt(diff: string) {
  const body: OllamaParams = {
    model: options.model,
    prompt: diff,
    format: "json",
    system: SYSTEM_MESSAGE,
    options: {
      num_ctx: Math.ceil(diff.length / 8000) * 4096 + 2048,
      temperature: 0,
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
    try {
      const json = JSON.parse(rawjson);

      if (json.done === false) {
        if (options.verbose) process.stdout.write(json.response);
        content += json.response;
      }
    } catch {
      break;
    }
  }
  if (options.verbose) process.stdout.write("\n\n");
  return removeEscapeCharacters(content);
}
