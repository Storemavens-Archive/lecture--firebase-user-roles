import pino from "pino";
import pinoHttp from "pino-http";


export const httpLogger = pinoHttp({
  level: "debug",
  prettyPrint: { colorize: true },
});

const logger = pino({
  level: "debug",
  prettyPrint: { colorize: true },
});

export default logger;
