require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug");
const uploads = require("./routes/uploads");
const index = require("./routes/index");

const app = express();
const startup = debug("startup");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    startup("Connect to MongoDB...");

    app.listen(port, () => {
      startup(`listening on port ${port}...`);
    });
  })
  .catch(() => startup("Could not connect to MongoDB..."));

app.set("view engine", "ejs");

app.use("/upload", uploads);
app.use("/", index);
