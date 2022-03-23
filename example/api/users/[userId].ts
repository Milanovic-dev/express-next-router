import { Request, Response } from "express";

export const get = (
  req: Request<{ userId: string }>,
  res: Response<string>
) => {
  console.log(req.params);
  res.status(200).send(req.params.userId);
};
