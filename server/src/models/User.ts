export enum AccountStatus{
  PENDING= "PENDING",
  VERIFIYED= "VERIFIYED"
}

enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER"
}

interface UserType {
  first_name: string
  last_name?: string
  username: string
  email: string
  password?: string
  created_at: Date
  updated_at: Date
  avatar?: string
  role: ROLE,
  accountStatus: AccountStatus
  
}

class User implements UserType{
  
  first_name: string
  last_name?: string
  username: string
  email: string
  password?: string
  created_at: Date
  updated_at: Date
  avatar?: string
  role: ROLE
  accountStatus: AccountStatus
  
  static tableName = "users"

  constructor({ first_name, last_name, username, email, password, avatar }: UserType ) {
    this.first_name = first_name
    this.last_name = last_name
    this.username = username
    this.email = email
    this.password = password
    this.created_at = new Date()
    this.updated_at = new Date()
    this.avatar = avatar
    this.role = ROLE.USER
    this.accountStatus = AccountStatus.PENDING
  }
}

export default User