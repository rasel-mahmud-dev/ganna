import express from "express";
import cors from "cors";
import capture404Error from "../errors/404";
import capture500Error from "../errors/500";
const morgan = require("morgan");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**** this is not work for netlify serverless function ***************/
app.use(express.static("public"));
// routes
const routes = require("./routes");

app.use(routes);

// Capture 404 errors
app.use(capture404Error);

// Capture 500 errors
app.use(capture500Error);

module.exports = app;

// export default app;
