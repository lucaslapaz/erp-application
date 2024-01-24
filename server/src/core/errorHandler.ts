import { NextFunction, Request, Response } from "express";



function ErrorHandler(error: Error, req:Request, res: Response, next: NextFunction)
{
    if(process.env.DEBUG === 'true'){
        console.log(`Erro: ${error.message}`)
    }
    return res.status(500).json({message: error.message});
}

module.exports = ErrorHandler;