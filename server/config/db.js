const Mongoose = require("mongoose");
const { database } = require("./index");

// Use native ES6 promises
Mongoose.Promise = global.Promise;
Mongoose.connect(database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = Mongoose.connection;

db.on("error", () => {
  console.log(
    `MongoDB connection error ${database.url}`,
    "Please make sure MongoDB is running."
  );
  process.exit();
});

db.once("open", () => {
  console.log("MongoDB connection with database succeeded.");
});

process.on("SIGINT", () => {
  db.close(() => {
    console.log("MongoDB connection disconnected through app termination.");
    process.exit();
  });
});

module.exports = db;
