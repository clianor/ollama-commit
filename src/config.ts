import * as dotenv from "dotenv";

import { DEFAULT_LANGUAGE, DEFAULT_MODEL, DEFAULT_PROVIDER } from "./constants";
import { getArgs } from "./utils/getArgs";

dotenv.config();

export const args = getArgs();

export const PROVIDER = DEFAULT_PROVIDER;
export const MODEL = args.model ?? process.env.MODEL ?? DEFAULT_MODEL;
export const RESPONSE_LANGUAGE =
  args.language ?? process.env.LANGUAGE ?? DEFAULT_LANGUAGE;
export const SIGNATURE = args.signature ?? process.env.SIGNATURE;
