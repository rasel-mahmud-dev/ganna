import connectDatabase from "../services/mysql";
import errorMessage from "../errors/errorMessage";

export enum AccountStatus{
  PENDING= "PENDING",
  VERIFIYED= "VERIFIYED"
}

enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface UserType {
  userId?: number
  firstName: string
  lastName?: string
  username?: string
  email: string
  password: string
  createdAt?: Date | string
  updatedAt?: Date | string
  avatar?: string
  role?: ROLE
  accountStatus?: AccountStatus
  
}

class User implements UserType{
  userId?: number
  firstName: string
  lastName?: string
  username?: string
  email: string
  password: string
  createdAt?: Date | string
  updatedAt?: Date | string
  avatar?: string
  role?: ROLE
  accountStatus?: AccountStatus
  
  static tableName = "users"

  constructor({ firstName, lastName, username, email, password }: UserType ) {
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.email = email
    this.password = password
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.role = ROLE.USER
    this.accountStatus = AccountStatus.PENDING
  }
  
  static findOne<T>(valuesObj: {} | any, selectFields?: string)  {
    return new Promise<T | null>(async (resolve, reject) => {
      let connection
      try{
        connection = await connectDatabase()
        let tableName = this.tableName
        
        let fieldName = ""
        let value = ""
        for(let key in valuesObj){
          fieldName = key
          value = valuesObj[key]
        }
        
        let sql  = `SELECT ${selectFields ? selectFields : '*' } from ${tableName} where ${fieldName} = "${value}"  `
        let [r, _]: any = await connection.query(sql)
        
        if(r.length > 0){
          resolve(r[0])
        } else {
          resolve(null)
        }
      } catch (ex: any){
        errorMessage(ex.message, )
        
      } finally {
        connection?.end()
      }
    })
  }
}

export default User