const config = require("./config");
const db = require("./config/db");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");

const io = require("./websocket")(server);

const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser());
app.use("/", routes);

db.on("connected", () => {
  server.listen(config.server.port, config.server.hostname, () => {
    console.log(`Server Started on port ${config.server.port}!`);
  });
});
