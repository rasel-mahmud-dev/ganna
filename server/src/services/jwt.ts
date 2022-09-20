
import jwt from "jsonwebtoken"

export function generateToken(userId: number, role: string){
    return jwt.sign({userId, role}, process.env.SECRET as string, {expiresIn: '7d'})
}

export function parseToken(token: string){
    return jwt.decode(token)
}