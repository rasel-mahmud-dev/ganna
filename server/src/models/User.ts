import Common from "./Common";

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

class User extends Common implements UserType{
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
    super(User.tableName)
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
}


export default User