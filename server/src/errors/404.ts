import { NextFunction, Request, Response} from "express";
import logger from "../logger";


// Capture 404 errors
function capture404Error(req: Request, res: Response, next: NextFunction){
    logger.error(`404 - ${req.originalUrl} - ${req.method} - ${req.ip} - Resource not found`);
    res.status(404).send({message: "Resource not found"});
}

export default  capture404Error