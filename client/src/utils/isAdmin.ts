export function isAdmin(auth: any){
    if(auth && auth.role === "ADMIN"){
        return true
    } else {
        return false
    }
}