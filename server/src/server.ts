import http from "http";

require("dotenv").config();

const app = require("./app/app");

import logger from "./logger";

const PORT = process.env.PORT || 8888;

const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`Server started and running on http://localhost:${PORT}`);
});
