const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_Secret = process.env.JWT_Secret;
require("../db/conn");
router.use(express.json());
router.use(cors());

//Registration(Signup)
router.get("/", (req, res) => {
  res.send("Hello World..");
});

router.post("/", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const UserExists = await User.findOne({ email: email });

    if (UserExists) {
      return res.status(422).json("User already Exists");
    } else {
      const user = new User({ name, email, password });
      await user.save();
      res.status(200).json("User successfully Registered!");
    }
  } catch (error) {
    res.status(422).json(`${error}`);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const details = req.body;
    const { email, password } = details;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const userLogin = await User.findOne({ email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      console.log(isMatch);
      if (!isMatch) {
        return res.status(422).json({ error: "Invalid Credential" });
      } else {
        const token = jwt.sign(details, JWT_Secret);
        const UserExists = await User.findOne({ email: email });
        if (UserExists) {
          await User.updateOne({ email: email }, { $set: { token: token } });
        }
        res.json({
          token: token,
          message: "Login Success!!",
        });
        return;
      }
    }
  } catch (error) {
    res.json("Invalid Credentials");
  }
});

router.post("/demo", async (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      const doc = await User.findOne({ token });
      console.log("doc"+ doc);
      if (doc) {
        const decoded = jwt.verify(token, JWT_Secret);
        console.log("decode"+ decoded);
        res.status(200).json({ message: "Login" });
      } else {
        res.status(400).json({ error: "Invalid Token" });
      }
    } else {
      res.status(400).json({ Error: "Token not provided" });

    }
  } catch (err) {
    res.status(400).json({ Error: err });

  }
});
module.exports = router;
