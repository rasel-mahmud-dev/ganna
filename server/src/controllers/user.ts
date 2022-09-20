import {NextFunction, Request, Response} from "express";

import {registerService} from "../services/auth";


export async function registrationController(req: Request, res: Response, next: NextFunction){
    try{
        const {firstName, lastName, email, password} = req.body;
        
        const user  = await registerService({firstName, lastName, email, password})
        
        res.status(201).json({message: "User created", user})
        
    } catch (ex){
        next(ex)
    }

}