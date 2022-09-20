import User from "../models/User";
import {genHash} from "./hash";


export async function registerService(payload: any){
    
    return new Promise(async (resolve, reject)=>{
        const { firstName, lastName, email, password } = payload
        
        try{
            let user = await User.findOne({email: email})
            if(user) {
                let error: any = new Error("You are already registered. Please login")
                error.status = 401
            }
            
            let uName = lastName ? lastName : ""
            
            let newUser = new User({
                firstName: firstName,
                lastName: uName,
                username: firstName + " " + uName,
                email,
                password: "",
            })
            newUser.password = await genHash(password);
            
            
            // resolve(newUser);
            
        } catch (ex){
        
        }
    })
}



export async function loginService({email}: {email: string}){
    try{
        let user = await User.findOne({email: email})
        if(!user) {
            let error: any = new Error("You are not registered. Please Register first")
            error.status = 404
        }
        
        
    } catch (ex){
    
    }
}