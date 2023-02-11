import { Application, static as expressStatic, Router } from "express";
import { buildHandlerChain } from "./builder";
import { extractFromFolders } from "./dirTreeSearch";
import { isValidMethod } from "./utils";
import { Endpoint, Method, Middleware } from "./interfaces";
import { createLogger, Logger } from "./logger";
const dirTree = require("directory-tree");

export interface Options {
  uri?: string;
  logger?: boolean;
  static?: {
    folders: string[];
    virtual?: string;
  };
}

let logger: Logger;

export function applyRoutes(
  app: Application,
  options: Options = { logger: true, uri: "/api" }
) {
  const start = performance.now();
  logger = createLogger(options);

  const apiUrl = `${process.cwd()}/${options?.uri ? options?.uri : "/api"}`;

  const tree = dirTree(apiUrl);

  if (!tree) {
    throw new Error(`There's no api folder in this directory. \nMake sure you have api folder in root directory or add a custom uri through options. \n(${apiUrl})`)
  }

  const { endpoints, middlewares } = extractFromFolders(tree, {
    ...options,
    uri: tree.name,
  });

  try {
    registerEndpointsToApp(app, endpoints, middlewares);

    if (options.static) {
      const { folders, virtual } = options.static;
      registerStaticFoldersToApp(app, folders, virtual);
    }
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

      app[method.toLowerCase()](endpoint.computedPath, ...handlerChain);
      logger.logRoute(`${method.toUpperCase()} ${endpoint.computedPath}`);
    }
  }
}

function registerStaticFoldersToApp(
  app: Application,
  staticFolders: string[] = [],
  virtual?: string
) {
  for (const folder of staticFolders) {
    if (virtual) {
      app.use(virtual, expressStatic(folder));
    } else {
      app.use(expressStatic(folder));
      logger.logRoute(`STATIC ${folder}`);
    }
  }

  if (virtual) {
    logger.logRoute(`STATIC ${virtual}`);
  }
}

function getMiddlewaresForPath(
  path: string,
  allMiddlewares: Array<Middleware>
): any {
  const foundMiddlewares = [];
  for (let middleware of allMiddlewares) {
    if (path.indexOf(middleware.path.split("_middleware")[0]) !== -1) {
      foundMiddlewares.push(...middleware.handlers);
    }
  }

  return foundMiddlewares;
}
