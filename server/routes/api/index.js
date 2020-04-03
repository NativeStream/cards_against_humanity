const express = require("express");
const authRouter = require("./auth");

const app = express();

app.use("/auth/", authRouter);
app.use("/room/", require("./room"));

module.exports = app;
