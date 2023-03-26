const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const cors= require('cors')
require("../db/conn");
router.use(express.json());
router.use(cors());


router.get("/", (req, res) => {
  res.send("Hello World..");
});

router.post('/', async(req,res)=>
{
    const {name, email, password, cpassword} = req.body
    if(!name || !email || !password || !cpassword)
    {
        return res.status(422).json({ error: "Pls fill all the fields" });
    }

    try {
        const UserExists=await User.findOne({email:email});
        if(UserExists)
        {
            return res.status(422).json({error: "User already Exists"});
        }else if(password != cpassword)
        {
            return res.status(422).json({error: "Password and Confirm Password must be same!"});
        }
        else{
            const user= new User({name, email, password, cpassword});
            await user.save();
            res.status(201).json({message: "User successfully Registered!"})
        }
    } catch (error) {
        console.log("Error: " + error);
    }
})
module.exports = router;