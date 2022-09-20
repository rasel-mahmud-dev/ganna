import http from "http"


require("dotenv").config()

import app from "./app/app"
import logger from "./logger";


const PORT = process.env.PORT || 1000;



const server = http.createServer(app);

server.listen(PORT,  ()=>{
    logger.info(`Server started and running on http://$localhost:${PORT}`)
})
