import { Command } from "commander";

import { version } from "../package.json";
import {
  DEFAULT_API_HOST,
  DEFAULT_LANGUAGE,
  DEFAULT_MAX_DIFF_LENGTH,
  DEFAULT_MODEL,
} from "./constants";

const program = new Command();
program
  .version(version)
  .description("Automatic commit generator using Ollama.")
  .option("-m, --model <model>", "ollama model", DEFAULT_MODEL)
  .option("-a, --api <api>", "api host", DEFAULT_API_HOST)
  .option("-l, --language <language>", "response language", DEFAULT_LANGUAGE)
  .option(
    "--max-diff-length <maxDiffLength>",
    "max diff length",
    DEFAULT_MAX_DIFF_LENGTH
  )
  .option("-s, --signature")
  .option("-v, --verbose")
  .parse(process.argv);

export default program.opts();
