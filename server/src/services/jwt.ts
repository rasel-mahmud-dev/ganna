
import jwt, {JwtPayload} from "jsonwebtoken"

interface P extends JwtPayload  {
    userId: number,
    role: string
}

export function generateToken(userId: number, role: string){
    const payload: P = {userId, role}
    return jwt.sign(payload,process.env.SECRET as string, {expiresIn: '7d'})
}

export function parseToken(token: string): P | null {
    let deco = jwt.decode(token) as P | null | string
    if(typeof deco === "object") {
        return  deco
    } else {
        return null
    }
}