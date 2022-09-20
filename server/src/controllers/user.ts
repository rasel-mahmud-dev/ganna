import {NextFunction, Request, Response} from "express";
import User from "../models/User";


export async function registration(req: Request, res: Response, next: NextFunction){
    try{
        const {firstName, lastName, email} = req.body;
        
        let user = await User.findOne({email: email})
        if(user){
            return res.status(401).json({
                message: "You are already registered. Please login"
            })
        }
    
        let uName = lastName ? lastName : ""
        
        let newUser = new User({
            firstName: firstName,
            lastName: uName,
            username: firstName + " " + uName,
            email,
            password: "",
        })
        
        res.send(newUser)
        
    } catch (ex){
        next(ex)
    }

}