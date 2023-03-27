const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const cors = require("cors");
require("../db/conn");
router.use(express.json());
router.use(cors());

//Registration(Signup)
router.get("/", (req, res) => {
  res.send("Hello World..");
});

router.post("/", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Pls fill all the fields" });
  }

  try {
    const UserExists = await User.findOne({ email: email });
    if (UserExists) {
      return res.status(422).json({ error: "User already Exists" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({error: "Password and Confirm Password must be same!"} );
    } else {
      const user = new User({ name, email, password, cpassword });
      await user.save();
      res.status(200).json({ message: "User successfully Registered!" });
    }
  } catch (error) {
    console.log("Error: " + error);
  }
});

//Login
// router.post("/", async (req, res) => {
//   try {
//     const details = req.body;
//     const { email, password } = details;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Please fill all the details" });
//     }
//     const userLogin = await User.findOne({ email });
//     if (userLogin)
//     {
//         const isMatch = await bcrypt.compare(password, userLogin.password);
//         const token = jwt.sign(details, "HelloIamYashu.Iamaprogrammer....");
//         res.json({
//           token: token,
//           message: "Login Success!!",
//         });

//         if (!isMatch) {
//           res.json({ message: "Invalid Credential" });
//         } else {
//           res.json({ message: "User signin successful" });
//         }
//     }
//   } catch (error) {
//         res.send("Invalid Credentials");

//   }
// });
module.exports = router;
