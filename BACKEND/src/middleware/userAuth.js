const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();



const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;

        if(!token){
            throw new Error("No token found!");
        }

        const decObj = jwt.verify(token, process.env.JWT_SECRET);
        const {_id} = decObj;


        const user = await User.findById(_id);

        if(!user){
            throw new Error("No User found!");
        }

        req.user = user;

        next();
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = userAuth;