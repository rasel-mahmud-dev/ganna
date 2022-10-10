import mysql from "mysql2/promise";

let DATABASE_URL = `mysql://${process.env.MYSQL_USERNAME}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DATABASE}?ssl={"rejectUnauthorized":true}`;

function connectDatabase() {
    return new Promise<mysql.Connection>(async (resolve, reject) => {
        try {
            let connection;
            if (process.env.NODE_ENV === "development") {
                connection = await mysql.createConnection({
                    host: "localhost",
                    port: "3306",
                    user: "root",
                    password: "12345",
                    insecureAuth: true,
                    database: "gungun",
                    // connectionLimit: 1,
                } as any);
            } else {
                connection = await mysql.createConnection(DATABASE_URL);
            }

            await connection.connect();
            resolve(connection);
        } catch (ex) {
            // errorConsole(ex)
            reject(ex);
        }
    });
}
export default connectDatabase;
