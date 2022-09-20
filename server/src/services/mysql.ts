import mysql from "mysql2/promise"


function connectDatabase(){
    return new Promise<mysql.Connection>(async (resolve, reject)=>{
        try {
            const connection = await mysql.createConnection({
                host: "localhost",
                port: "3306",
                user: "root",
                password: "12345",
                insecureAuth : true,
                database: "ganna",
                connectionLimit: 1
            } as any)
            
            await connection.connect()
            resolve(connection)
            
        } catch (ex){
            // errorConsole(ex)
            reject(ex)
        }
    })
}
export default connectDatabase

