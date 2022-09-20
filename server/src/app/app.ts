import express from "express"
import cors from "cors";
const path = require("path");
const morgan = require("morgan");

require("dotenv").config()

import routes from "./routes";
import capture404Error from "../errors/404";
import capture500Error from "../errors/500";


const app = express()

// routes
app.use(routes);

app.use(cors())
app.use(express.json())
app.use("/static/", express.static("static"))
app.use(morgan("dev"))



// Capture 404 errors
app.use(capture404Error)

// Capture 500 errors
app.use(capture500Error)



export default app