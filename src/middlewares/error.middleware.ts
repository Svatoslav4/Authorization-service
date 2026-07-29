import { Request,Response,NextFunction } from "express";
import { Error } from "../types/error.types";

const errorMiddleware = (err: Error,req: Request,res: Response,next: NextFunction,) => {
    console.log(err)

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}