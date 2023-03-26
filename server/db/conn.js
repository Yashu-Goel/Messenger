const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("no connection : " + error);
  });
