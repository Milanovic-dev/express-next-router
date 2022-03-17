import { Request as ExpressRequest } from "express";

export type Method = "get" | "put" | "post" | "patch" | "delete";

export type Handler = (req: Request, res: Response) => Promise<any>;

export interface Endpoint {
  path: string;
  computedPath: string;
  methods: Record<string, Handler>;
}

export interface Middleware {
  path: string;
  handlers: Handler[];
}

export interface Request extends ExpressRequest {
  validate: (input: any) => boolean;
}