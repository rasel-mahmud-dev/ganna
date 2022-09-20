import express from "express"
import cors from "cors";
const path = require("path");
const morgan = require("morgan");

require("dotenv").config()

import routes from "./routes";


const app = express()

// routes
app.use(routes);

app.use(cors())
app.use(express.json())
app.use("/static/", express.static("static"))
app.use(morgan("dev"))
// routes(app)


export default app