import { Ollama } from "@langchain/community/llms/ollama";
import options from "../options";

export async function getTokenCount(text: string) {
  const model = new Ollama({
    baseUrl: options.api,
    model: options.model,
  });
  return model.getNumTokens(text);
}
