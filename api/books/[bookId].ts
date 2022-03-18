import { Request, Response } from "express";

module.exports = {
  put: (req: Request<{ bookId: string }>, res: Response) => {
    const bookId = req.params.bookId;
    res.send(bookId);
  },
  fn: () => {
    console.log("fn");
  },
};
