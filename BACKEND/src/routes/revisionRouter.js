const express = require("express");
const userAuth = require("../middleware/userAuth");
const Gaps = require("../models/gapsSchema");
const datesEngine = require("../utils/datesEngine");
const Revision = require("../models/revisionSchema");

const revisionRouter = express.Router();

revisionRouter.use("/revision", userAuth);

// router to get the gaps data
revisionRouter.get("/revision/revdata/gap", async(req, res) => {
    try{
        const _id = req.user._id;
        const gapsDb = await Gaps.findOne({
            userId: _id
        });

        const gaps = gapsDb.gaps;

        res.json({gaps});

    }
    catch(err){
        res.status(400).json({
            message: "Error getting the data: " + err.message
        });
    }
});


// router to get a particular notes data
revisionRouter.get("/revision/:revId", async (req, res) => {
        try{
    
            const {revId} = req.params;
            const rev = await Revision.findById(revId);
            res.json({rev});
        }
        catch(err){
            res.status(400).json(
                {message: "Error getting the revision: " + err.message}
            )
        }
})

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

        res.json({reqMaterial});
    }
    catch(err){
        res.status(400).json({
            message: "Error getting the data: " + err.message
        });
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

        res.json({
            message: "Material saved successfully!"
        });
    }
    catch(err){
        res.status(400).json({
            message: "Error saving the material: " + err.message
        });
    }
});

// route to update the gap system
revisionRouter.patch("/revision/revdata/gap", async(req, res) => {
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


        res.send({
            message: "Gap change updated successfully!"
        });
    }
    catch(err){
        res.status(400).send({
            message: "Error updating the gap: " + err.message
        });
    } 
});


module.exports = revisionRouter;