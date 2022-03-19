import { isFunction } from "./utils";
import { Handler } from "./interfaces";

export function buildHandlerChain(
  handlers: Handler | Handler[],
  middlewares: Handler[]
): Handler[] {
  let handlerChain: Handler[] = [...middlewares];

  if (isFunction(handlers)) {
    handlerChain.push(handlers as Handler);
  } else {
    handlerChain = [...middlewares, ...(handlers as Handler[])];
  }

  return handlerChain;
}
