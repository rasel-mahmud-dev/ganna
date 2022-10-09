import mysql from "mysql2/promise";

let DATABASE_URL = `mysql://${process.env.MYSQL_USERNAME}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DATABASE}?ssl={"rejectUnauthorized":true}`;

function connectDatabase() {
    return new Promise<mysql.Connection>(async (resolve, reject) => {
        try {
            const connection = await mysql.createConnection(DATABASE_URL);
            // const connection = await mysql.createConnection({
            //     host: process.env.MYSQL_HOST,
            //     // port: "3306",
            //     user: process.env.MYSQL_USERNAME,
            //     password: process.env.MYSQL_PASSWORD,
            //     // insecureAuth: false,
            //     database: process.env.MYSQL_DATABASE,
            //     // connectionLimit: 1,
            //
            //     // host: "localhost",
            //     // port: "3306",
            //     // user: "root",
            //     // password: "12345",
            //     // insecureAuth : true,
            //     // database: "ganna",
            //     // connectionLimit: 1
            // } as any);

            await connection.connect();
            resolve(connection);
        } catch (ex) {
            // errorConsole(ex)
            reject(ex);
        }
    });
}
export default connectDatabase;
