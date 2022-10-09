const serverless = require("serverless-http");
const bodyParser = require("body-parser");
import capture404Error from "../src/errors/404";
import capture500Error from "../src/errors/500";

const cors = require("cors");

let routes;
routes = require("../src/app/routes");
// routes = require("../dist/app/routes")

let app;
app = require("../src/app/app");
// app = require("../dist/app/app");

app.use(cors());

app.get("/", (req, res) => {
    res.send("success");
});

/**** Capture error for netlify serverless function ***************/
// Capture 404 errors
routes.use(capture404Error);
//
// Capture 500 errors
routes.use(capture500Error);

app.use(bodyParser.json());
app.use("/.netlify/functions/app", routes); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
