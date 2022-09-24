import {Handler, NextFunction} from "express";
import User, {ROLE, UserType} from "../models/User";
import {parseToken} from "../services/jwt";
import {RequestWithAuth} from "../types";
import errorMessage from "../errors/errorMessage";



export default function auth(roles: ROLE[]){
    
    return async (req: RequestWithAuth, res: Response, next:NextFunction)=>{
    
        try{
            // @ts-ignore
            const token = req.headers['authorization']
            if(!token){
                // @ts-ignore
                return res.status(403).json({message: "Not authorized"})
            }
            const data = parseToken(token)
            if(!data){
                // @ts-ignore
                return res.status(403).json({message: "UnAuthorize. login first"})
            }
            const user = await User.findOne<UserType>({userId: data?.userId})
            if(!user){
                // @ts-ignore
                return res.status(403).json({message: "UnAuthorize. login first"})
            }
    
            if(!roles.includes(user.role as any)){
                return errorMessage("unauthorized", 409)
            }
            
            req.user = {
                userId: user.userId,
                role: user.role
            }
        
            next()
        
        } catch (ex){
            next(ex)
        }
    }
}