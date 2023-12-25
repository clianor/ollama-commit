import * as dotenv from "dotenv";

import { getArgs, stringToBoolean } from "./helpers";

dotenv.config();

export const args = getArgs();

export const PROVIDER = "ollama";

/**
 * ollma model list
 * https://ollama.ai/library
 */
export const MODEL = args.model || process.env.MODEL || "mistral";

export const RESPONSE_LANGUAGE =
  args.language || process.env.LANGUAGE || "English";

export const SIGNATURE = stringToBoolean(
  args.signature || process.env.SIGNATURE
);
