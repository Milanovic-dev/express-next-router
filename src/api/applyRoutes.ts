import { Application } from "express";
import { buildEndpoint } from "./builder";
import { extractFromFolders } from "./dirTreeSearch";
import { isValidMethod } from "./helpers";
import { Endpoint, Method, Middleware } from "./interfaces";
import { createLogger, Logger } from "./logger";
const dirTree = require("directory-tree");

export interface Options {
  customUri?: string;
  logger?: boolean;
}

let logger: Logger;

export function applyRoutes(app: Application, options: Options = { logger: true, customUri: "/api" }) {
  const start = performance.now();
  logger = createLogger(options);
  logger.logWait("collecting routes");

  const tree = dirTree(`${process.cwd()}${options?.customUri ? options?.customUri : "/api"}`);

  if (!tree) {
    logger.logError("Cannot find the root folder: " + options.customUri);
    return;
  }

  const { endpoints, middlewares } = extractFromFolders(tree, {
    ...options,
    customUri: tree.name
  });

  try {
    registerEndpointsToApp(app, endpoints, middlewares);
    logger.logSuccess(
      `done in ${Math.floor((performance.now() - start) / 1000)}s`
    );
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

      const handlerChain = buildEndpoint(endpoint.methods[method], getMiddlewaresForPath(
        endpoint.path,
        middlewares
      ));

      app[method](endpoint.computedPath, ...handlerChain as any);
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
