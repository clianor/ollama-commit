import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import options from "../options";
import { commitSchema } from "../constants/schema";

export async function ollamaPrompt(diff: string) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Generate an appropriate conventional commit message based on the output of the git diff --cached command.",
    ],
    ["human", "{diff}"],
  ]);

  const model = new ChatOllama({
    baseUrl: options.api,
    model: options.model,
    checkOrPullModel: true,
    format: "json",
    temperature: 0.2,
  });

  const structuredModel = model.withStructuredOutput(commitSchema, {
    name: "generate_commit",
    method: "functionCalling",
  });

  const chain = prompt.pipe(structuredModel);
  return chain.invoke({ diff });
}
