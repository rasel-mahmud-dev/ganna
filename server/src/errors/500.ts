// Capture 500 errors
import { NextFunction, Request, Response} from "express";
import logger from "../logger";


function capture500Error(err: any, req: Request, res: Response, next: NextFunction){

	if(typeof err === "string"){
		return res.status(500).json({message: err ? err : 'Internal server Error' }) ;
	}
	
	const errorMessage = err.message || 'Internal server Error'
	
	logger.error(`${err.status || 500} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${res.statusMessage} - ${err.message}`);
	res.status(err.status || 500).json({message: errorMessage});
}


export default capture500Error