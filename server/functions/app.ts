import routes from "../dist/app/routes";

const serverless = require("serverless-http");

const bodyParser = require("body-parser");

import app from "../dist/app/app";
import capture404Error from "../src/errors/404";
import capture500Error from "../src/errors/500";
import express from "express";
import * as path from "path";

// routes
app.use(routes);
// view at http://localhost:12000/
app.use(express.static("public/"));
// // Capture 404 errors
// app.use(capture404Error);
// //
// // Capture 500 errors
// app.use(capture500Error);

routes.use(express.static("public"));

app.use(bodyParser.json());
app.use("/.netlify/functions/app", routes); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
