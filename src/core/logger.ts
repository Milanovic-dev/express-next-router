import { Options } from "./applyRoutes";

const colors = require("cli-color");
export interface Logger {
  log: (message: string) => void;
  logWait: (message: string) => any;
  logSuccess: (message: string) => void;
  logRoute: (message: string) => void;
  logError: (message: string) => void;
}

export function createLogger({ logger = true }: Partial<Options>): Logger {
  function log(message: string) {
    if (!logger) return;

    console.log(message);
  }

  function logSuccess(message: string) {
    log("");
    log(colors.green("✓ ") + message);
    log("");
  }

  function logRoute(message: string) {
    log("➜ " + colors.yellow(message));
  }

  function logError(message: string) {
    log("");
    log(colors.red("Next Router Error: " + message));
    log("");
  }

  function logWait(message: string) {
    log("🕐 " + message);
  }

  return {
    log,
    logWait,
    logSuccess,
    logRoute,
    logError,
  };
}
