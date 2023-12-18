import * as dotenv from "dotenv";

dotenv.config();

export const PROVIDER = "ollama";

/**
 * ollma model list
 * https://ollama.ai/library
 */
export const MODEL = process.env.MODEL || "mistral";
