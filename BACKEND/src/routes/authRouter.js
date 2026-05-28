const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const authValidator = require("../validator/authValidator");
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
        res.send("User saved successfully!");

    }
    catch(err){
        res.status(400).send("Error signing up: " + err.message);
    }
});

// login route
authRouter.post("/login", async (req, res) => {
    try{
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
        res.send("User logged in successfully!");
    }
    catch(err){ 
        res.status(400).send("Error logging in the user: "+ err.message);
    }
});


// logout route
authRouter.post("/logout", async (req, res) => {
    try{
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.send("User logged out successfully!")
    }
    catch(err){
        res.status(400).send("Error logging out: " + err.message);
    }
});


module.exports = authRouter;
