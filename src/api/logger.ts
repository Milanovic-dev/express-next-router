import { Options } from "./applyRoutes";

const clc = require("cli-color");

enum LogType {
  INFO = "INFO",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  WAIT = "WAIT",
  ROUTE = "ROUTE",
}

export interface Logger {
  log: (message: string, type: LogType) => void;
  logInfo: (message: string) => void;
  logRoute: (message: string) => void;
  logError: (message: string) => void;
  logSuccess: (message: string) => void;
  logWait: (message: string) => void;
}

function getColorFunction(type: LogType) {
  switch (type) {
    case LogType.INFO:
      return clc.magenta("info");
    case LogType.SUCCESS:
      return clc.green("success");
    case LogType.ERROR:
      return clc.red("error");
    case LogType.WAIT:
      return clc.blue("wait");
    default:
      return clc.magenta("route");
  }
}

export function createLogger({ logger = true }: Partial<Options>): Logger {
  function log(message: string, type: LogType) {
    if (!logger) return;

    console.log(`${getColorFunction(type)} - ${message}`);
  }

  function logSuccess(message: string) {
    log(message, LogType.SUCCESS);
  }

  function logError(message: string) {
    log(message, LogType.ERROR);
  }

  function logWait(message: string) {
    log(message, LogType.WAIT);
  }

  function logInfo(message: string) {
    log(message, LogType.INFO);
  }

  function logRoute(message: string) {
    log(message, LogType.ROUTE);
  }

  return {
    log,
    logInfo,
    logRoute,
    logError,
    logSuccess,
    logWait,
  };
}
