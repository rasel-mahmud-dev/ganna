const  bcryptjs = require("bcryptjs")


export async function genHash(password: string) {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, salt)
}

export async function compareHash(password: string, hash: string) {
    return bcryptjs.compare(password, hash)
}