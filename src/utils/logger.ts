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

// import winston from "winston";

// import options from "../options";

// const { createLogger, config, format, transports } = winston;

// const logger = createLogger({
//   levels: config.syslog.levels,
//   format: format.combine(format.simple()),
//   transports: [
//     new transports.Console({
//       level: options?.verbose ? "debug" : "warn",
//       format: format.combine(format.colorize(), format.simple()),
//     }),
//   ],
// });

// export default logger;
