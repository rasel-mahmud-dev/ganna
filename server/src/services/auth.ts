import User, {UserType} from "../models/User";
import {genHash} from "./hash";
import {createUser} from "./user";
import sqlDate from "../utils/sqlDate";
import errorMessage from "../errors/errorMessage";
import {generateToken} from "./jwt";


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



export async function loginService({email, password}: {email: string, password: string}): Promise<{token: string, user: UserType} | any>{
    try{
        let user = await User.findOne<UserType | null>({email: email})
        if(!user) {
            return errorMessage("You are not registered. Please Register first", 404)
        }
        
        const token = generateToken(user.userId as number, user?.role as string)
        return  {
            token: token,
            user: user
        }
        
    } catch (ex: any){
        let message = ""
        if(ex.message) {
           message = ex.message;
        }
        errorMessage(message)
    }
}
