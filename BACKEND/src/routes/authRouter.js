const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const authValidator = require("../validator/authValidator");
const Gaps = require("../models/gapsSchema");
const userAuth = require("../middleware/userAuth");
require("dotenv").config();


const authRouter = express.Router();

// signup route
authRouter.post("/signup", async (req, res) => {
    try{
        // validation logic as follow
        authValidator(req.body);

        const {firstName, lastName, emailId, password} = req.body;

        // the encryption logic here with salt value 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating a new User instance
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        })

        await user.save();

        const gaps = new Gaps({
            userId: user._id
        });
        await gaps.save();

        res.json({
            message: "User registered successfully!"
        })

    }
    catch(err){
        res.status(400).json({
            message: "Error signing up" + err.message
        })
    }
});

// login route
authRouter.post("/login", async (req, res) => {
    try{
        console.log(req.body);

        const {emailId, password} = req.body;

        const user = await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid credentials!");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            throw new Error("Invalid credentials!");
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        res.json({
            message: "User logged in successfully!"
        });
    }
    catch(err){ 
        res.status(400).json({
            message: "Error logging in" + err.message
        });
    }
});


// logout route
authRouter.post("/logout", async (req, res) => {
    try{
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.json({
            message: "User logged out successfully!" + err.message
        });
    }
    catch(err){
        res.status(400).json({
            message: "Error logging out" + err.message
        });
    }
});


//verfication route
authRouter.get("/verify", userAuth, async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User perfectly authorized!"
    })
});

module.exports = authRouter;
