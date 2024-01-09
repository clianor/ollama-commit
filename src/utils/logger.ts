import winston from "winston";

import options from "../options";

const { createLogger, config, format, transports } = winston;

const logger = createLogger({
  levels: config.syslog.levels,
  format: format.combine(format.simple()),
  transports: [
    new transports.Console({
      level: options?.verbose ? "debug" : "warn",
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export default logger;
