import { createConsola } from "consola";
import options from "../options";

const logger = createConsola({
  level: options?.verbose ? +999 : 3,
  fancy: true,
  formatOptions: {
    colors: true,
    compact: false,
    date: false,
  },
});

export default logger;
