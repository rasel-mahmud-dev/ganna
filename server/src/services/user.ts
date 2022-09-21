import {UserType} from "../models/User";
import connectDatabase from "./mysql";



export async function createUser(user: UserType) {
    
    let fieldName = ""
    let values = ""
    
    let userKey: keyof UserType
    for (userKey  in user) {
        if(!user[userKey]){
            delete user[userKey]
        } else {
            fieldName = fieldName + ", " + userKey
            values = values + `, "${user[userKey]}"`
        }
    }
    
    try{
        let sql = 'insert into users(' + fieldName.slice(2)  +' ) Values(' + values.slice(2) + ')'
    
        const connection = await connectDatabase()
        let [result] = await connection.execute<any>(sql)
    
        if(result["affectedRows"]){
            return {
                ...user,
                userId: result["insertId"]
            }
        } else {
            return null
        }
    } catch (ex){
        throw ex
    }
}
