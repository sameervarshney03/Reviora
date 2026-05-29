const express = require("express");
const userAuth = require("../middleware/userAuth");
const Gaps = require("../models/gapsSchema");
const datesEngine = require("../utils/datesEngine");
const Revision = require("../models/revisionSchema");

const revisionRouter = express.Router();

revisionRouter.use("/revision", userAuth);

// route to get the revision data
revisionRouter.get("/revision", async (req, res) => {
    try{

        const _id = req.user._id;
        const gapsDb = await Gaps.findOne({
            userId: _id
        });

        const gaps = gapsDb.gaps;

        const dates = datesEngine(gaps);

        const rangeDates = dates.map((element) => {
            const start = new Date(element);
            start.setHours(0,0,0,0)

            const end = new Date(element);
            end.setHours(23, 59, 59, 999);

            return {
                start: start,
                end: end
            };
        });

        const reqMaterial = await Promise.all(

            rangeDates.map(async (element) => {

                return await Revision.find({

                    userId: req.user._id,

                    createdAt: {
                        $gte: element.start,
                        $lte: element.end
                    }
                });

            })
        );

        res.send(reqMaterial);
    }
    catch(err){
        res.status(400).send("Error getting the data: " + err.message);
    }
});

// router to add the revision data
revisionRouter.post("/revision", async(req, res) => {
    try{
        const userId = req.user._id;
        const {material} = req.body;

        const revi = new Revision({
            userId,
            material
        });

        await revi.save();

        res.send("Material saved successfully!");
    }
    catch(err){
        res.status(400).send("Error saving the material: " + err.message);
    }
});

// route to update the gap system
revisionRouter.patch("/revision/gapchange", async(req, res) => {
    try{
        const isUpdateAllowed = Object.keys(req.body).every((k) => k === "gaps");
        if(!isUpdateAllowed){
            throw new Error("Update not allowed!");
        }

        const userId = req.user._id;
        const {gaps} = req.body;

        await Gaps.findOneAndUpdate({
            userId: userId
        }, req.body);


        res.send("Gap change updated successfully!");
    }
    catch(err){
        res.status(400).send("Error updating the gap: " + err.message);
    } 
});


module.exports = revisionRouter;