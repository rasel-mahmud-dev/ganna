import http from "http"


require("dotenv").config()

import app from "./app/app"


const PORT = process.env.PORT || 1000;



const server = http.createServer(app);

server.listen(PORT,  ()=>{})
