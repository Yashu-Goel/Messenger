import express from "express";
import User from "../models/userSchema.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import "../db/conn.js";
import authUser from "../middleWare.js/authUser.js";

dotenv.config();

const JWT_Secret = process.env.JWT_Secret;
const router = express.Router();

router.use(express.json());
router.use(cors());

const generateToken = (id) => {
  return jwt.sign(id, JWT_Secret);
}

router.post("/", async (req, res) => {

  const { name, password, email, pic } = req.body;

  try {
    const UserExists = await User.findOne({ email: email });

    if (UserExists) {
      return res.status(422).json("User already Exists");
    } else {

      const user = await User.create({ name, email, password, pic });

      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id.toString())
        })
      }
      else res.status(400).json("Signup failed");
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

    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(422).json({ error: "Invalid Credential" });
      } else {

        const token = jwt.sign(details, JWT_Secret);

        const UserExists = await User.findOne({ email: email });

        if (UserExists) {
          res.status(200).json({
            _id: UserExists._id,
            name: UserExists.name,
            email: UserExists.email,
            pic: UserExists.pic,
            token: generateToken(UserExists._id.toString())
          });
        }
        else res.status(400).json("Login Failed");
      }
    } else {
      return res
        .status(422)
        .json({ error: "User does not exists. Kindly register" });
    }
  } catch (error) {
    res.json("Invalid Credentials");
  }
});

router.get('/', authUser, async (req, res) => {
  try {
    const keyWord = req.query.search ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    } : {};

    const users = await User.find(keyWord).find({ _id: { $ne: req.user._id } });
    res.send(users);

  } catch (err) {
    res.status(400).json({ Error: err });
  }
})


export default router;
