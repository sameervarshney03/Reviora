const express = require("express");
const User = require("../models/userSchema");
const userAuth = require("../middleware/userAuth");
const profileValidator = require("../validator/profileValidator");

const profileRouter = express.Router();

profileRouter.use("/profile", userAuth);

// route to get the profile data
profileRouter.get("/profile/view", async (req, res) =>{
        try{    
            const {firstName, lastName, emailId} = req.user;

            res.json({firstName, lastName, emailId});
        }
        catch(err){
            res.status(400).json({
                message: "Error getting the profile: " + err.message
            });
        }
    }
);

// route to update the profile data
profileRouter.patch("/profile/edit", async (req, res) => {
    try{
        const allowedUpdates = ["firstName","lastName"];
        const isUpdateallowed = Object.keys(req.body).every((k) => allowedUpdates.includes(k));

        if(!isUpdateallowed){
            throw new error("Update not allowed!");
        }

        profileValidator(req.body);

        await User.findByIdAndUpdate(req.user._id, req.body);
        res.json({
            message: "Data updated successfully!"
        });

    }
    catch(err){
        res.status(400).send({
            message: "Error updating the user: " + err.message
        });
    }
});

module.exports = profileRouter;