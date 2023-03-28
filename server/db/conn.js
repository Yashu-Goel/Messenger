import { connect } from "mongoose";
import { config } from "dotenv";
config();
const DB = process.env.DATABASE;
connect(DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("no connection : " + error);
  });
