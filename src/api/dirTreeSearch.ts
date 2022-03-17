import { Options } from ".";
import {
  computePathToUrl,
  getLoadedModuleProperties,
  isEndpointFile,
  isMiddlewareFile,
  loadModule,
} from "./helpers";
import { Endpoint, Middleware } from "./interfaces";

require("ts-node").register({
  /* options */
});

interface Node {
  path: string;
  name: string;
  children?: Node[];
}

interface ExtractedPaths {
  endpoints: Endpoint[];
  middlewares: Middleware[];
}

export function extractFromFolders(rootNode: Node, options: Options): ExtractedPaths {
  const endpoints = [];
  const middlewares = [];

  searchAndRegister(rootNode, endpoints, middlewares, options);

  return {
    endpoints,
    middlewares,
  };
}

function searchAndRegister(
  node: Node,
  endpoints: Endpoint[],
  middlewares: Middleware[],
  options: Options
) {
  const children = node.children;

  if (!children || (children && children.length === 0)) {
    const module = loadModule(node.path);

    if (!module) {
      return;
    }

    if (isEndpointFile(node.name)) {
      endpoints.push({
        path: node.path,
        computedPath: computePathToUrl(node.path, options.customUri),
        methods: module as Record<string, any>,
      });
    } else if (isMiddlewareFile(node.name)) {
      const handlers = getLoadedModuleProperties(module);
      middlewares.push({ path: node.path, handlers });
    }

    return;
  }

  for (let child of children) {
    searchAndRegister(child, endpoints, middlewares, options);
  }
}
