import { Command } from "commander";

import { version } from "../package.json";
import { DEFAULT_API_HOST, DEFAULT_LANGUAGE, DEFAULT_MODEL } from "./constants";

const program = new Command();
program
  .version(version)
  .description("Automatic commit generator using Ollama.")
  .option("-m, --model <model>", "ollama model", DEFAULT_MODEL)
  .option("-a, --api <api>", "api host", DEFAULT_API_HOST)
  .option(
    "-l, --language <language>",
    "the string of the language to translate to. It can be in any of the two ISO 639 (1 or 2) or the full name in English like Spanish.",
    DEFAULT_LANGUAGE
  )
  .option("-s, --signature")
  .option("-v, --verbose")
  .parse(process.argv);

export default program.opts();
