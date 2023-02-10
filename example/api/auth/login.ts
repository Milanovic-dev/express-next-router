import { Request, Response } from "express";



export const post = (req: Request, res: Response) => {
    const input = req.body
    
    res.status(200).send('Auth success')
}