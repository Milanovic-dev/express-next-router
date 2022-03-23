import { NextFunction, Request, Response } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
  console.log("This is middleware");
  next();
}
