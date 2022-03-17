import { Application } from "express";
import { buildHandlerChain } from "./builder";
import { extractFromFolders } from "./dirTreeSearch";
import { isValidMethod } from "./utils";
import { Endpoint, Method, Middleware } from "./interfaces";
import { createLogger, Logger } from "./logger";
const dirTree = require("directory-tree");

export interface Options {
  customUri?: string;
  logger?: boolean;
}

let logger: Logger;

export function applyRoutes(
  app: Application,
  options: Options = { logger: true, customUri: "/api" }
) {
  const start = performance.now();
  logger = createLogger(options);
  logger.logWait("Collecting your routes.");
  logger.log("Press Ctrl+C to cancel.");
  logger.log("");

  const tree = dirTree(
    `${process.cwd()}${options?.customUri ? options?.customUri : "/api"}`
  );

  if (!tree) {
    logger.logError(
      "There's no api folder in this directory. \nMake sure you have api folder in root directory or add a custom uri through options."
    );
    return;
  }

  const { endpoints, middlewares } = extractFromFolders(tree, {
    ...options,
    customUri: tree.name,
  });

  try {
    registerEndpointsToApp(app, endpoints, middlewares);
    logger.logSuccess(`Routed (${(performance.now() - start).toFixed(0)}ms)`);
  } catch (err) {
    logger.logError(err);
  }
}

function registerEndpointsToApp(
  app: Application,
  endpoints: Endpoint[],
  middlewares: Middleware[]
) {
  for (let endpoint of endpoints) {
    for (let method of Object.keys(endpoint.methods)) {
      if (!isValidMethod(method as Method)) {
        continue;
      }

      const endpointHandler = endpoint.methods[method];

      const handlerChain = buildHandlerChain(
        endpointHandler,
        getMiddlewaresForPath(endpoint.path, middlewares)
      );

      app[method](endpoint.computedPath, ...handlerChain);
      logger.logRoute(`${method.toUpperCase()} ${endpoint.computedPath}`);
    }
  }
}

function getMiddlewaresForPath(path: string, all: Array<Middleware>): any {
  const foundMiddlewares = [];
  for (let middleware of all) {
    if (path.indexOf(middleware.path.split("_middleware")[0]) !== -1) {
      foundMiddlewares.push(...middleware.handlers);
    }
  }

  return foundMiddlewares;
}
