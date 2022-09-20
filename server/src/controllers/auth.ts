import {NextFunction, Request, Response} from "express";

import {loginService, registerService} from "../services/auth";
import {generateToken} from "../services/jwt";


export async function registrationController(req: Request, res: Response, next: NextFunction){
    try{
        const {firstName, lastName, email, password} = req.body;
        
        const user = await registerService({firstName, lastName, email, password})
        user.password = ""
        const token = generateToken( user.userId as number, user.role as string)
        res.status(201).json({message: "User created", user, token})
        
    } catch (ex){
        next(ex)
    }
}

export async function loginController(req: Request, res: Response, next: NextFunction){
    try{
        const {email, password} = req.body;
        
        const {token, user} = await loginService({email, password})
        
        res.status(201).json({message: "You are Logged", user, token})
        
    } catch (ex){
        next(ex)
    }
}
