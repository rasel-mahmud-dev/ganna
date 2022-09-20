import User, {UserType} from "../models/User";
import {genHash} from "./hash";
import {createUser} from "./user";
import sqlDate from "../utils/sqlDate";


export async function registerService(payload: any){
    
    return new Promise<UserType>(async (resolve, reject)=>{
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
            newUser.createdAt = sqlDate(newUser.createdAt)
            newUser.updatedAt = sqlDate(newUser.updatedAt)
            
            const returnUser: any = await createUser(newUser)
            resolve(returnUser);
            
        } catch (ex){
            reject("Registration fail. Please try again")
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