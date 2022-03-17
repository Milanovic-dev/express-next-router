import e = require("express");
import { Method } from "./interfaces";

export function computePathToUrl(pathUri: string, uri: string): string {
  if (!pathUri.split(uri)[1]) {
    throw new TypeError(`Error: Cannot split path by: ${uri}.`);
  }
  return (
    `/${uri}` +
    pathUri
      .split(uri)[1]
      .replace(/\[/g, ":")
      .replace(/\]/g, "")
      .replace(/\\/g, "/")
      .replace(".ts", "")
      .replace(".js", "")
      .replace(".mjs", "")
      .replace(".mts", "")
      .replace(".cjs", "")
  );
}

export function isEndpointFile(name: string) {
  return (
    (name.indexOf(".ts") !== -1 ||
      name.indexOf(".js") !== -1 ||
      name.indexOf(".mjs") !== -1 ||
      name.indexOf(".mts") !== -1 ||
      name.indexOf(".cjs") !== -1) &&
    name.indexOf("_") === -1
  );
}

export function isMiddlewareFile(name: string) {
  return name.indexOf(name.split("_middleware")[0]) !== -1;
}

export function isValidMethod(method: Method) {
  return (
    method === "get" ||
    method === "delete" ||
    method === "post" ||
    method === "patch" ||
    method === "put" ||
    method === "all"
  );
}

export function getLoadedModuleProperties(loadedModule: any) {
  return Object.keys(loadedModule).map((key) => {
    return loadedModule[key];
  });
}

export function loadModule(name: string) {
  let module = require(name);

  if (module.default) {
    if (typeof module.default === "function") {
      return { all: module.default };
    }

    return module.default;
  }

  return module;
}

export function isFunction(obj: any) {
  return typeof obj === "function";
}
