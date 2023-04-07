import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import "../db/conn.js";

const authUser = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_Secret);
            req.user = await User.findById(decoded).select("-password");
            next();
        }
        catch (error) {
            res.status(401);
        }
    }
    else {
        res.status(401).json("Not authorized, no token");
    }
}
export default authUser;