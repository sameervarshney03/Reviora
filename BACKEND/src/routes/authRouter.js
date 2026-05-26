const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const authRouter = express.Router();


authRouter.use(express.json());

authRouter.post("/signup", async (req, res) => {
    try{
        // validation logic to be added here

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
        res.send("user saved successfully!");

    }
    catch(err){
        res.status(400).send("error signing up" + err.message);
    }
});


authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            throw new Error("invalid credentials");
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.send("user logged in successfully!");
    }
    catch(err){ 
        res.status(400).send("error logging in the user: "+ err.message);
    }
});


// here is the logout logic
authRouter.post("/logout", async (req, res) => {
    try{
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.send("user logged out successfully!")
    }
    catch(err){
        res.status(400).send("error logging out: " + err.message);
    }
});


module.exports = authRouter

