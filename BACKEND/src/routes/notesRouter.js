const express = require("express");
const Notes = require("../models/notesSchema");
const userAuth = require("../middleware/userAuth");
const noteValidator = require("../validator/noteValidator");

const notesRouter = express.Router();
notesRouter.use("/notes", userAuth);

// route to get all the notes
notesRouter.get("/notes/view", async (req, res) => {
    try{
        const notes = await Notes.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.json({notes});
    }
    catch(err){
        res.status(400).json(
            {message: "Error getting the notes: " + err.message}
        );
    }
});

// route to get a particular note
notesRouter.get("/notes/:noteId", async (req, res) => {
    try{

        const {noteId} = req.params
        const note = await Notes.findById(noteId);

        res.json({note});
    }
    catch(err){
        res.status(400).json(
            {message: "Error getting the notes: " + err.message}
        )
    }
});

// route to add the note
notesRouter.post("/notes/add", async (req, res) => {
    try{

        noteValidator(req.body);

        const {title, description} = req.body;
        const _id = req.user._id;

        const note = new Notes({
            userId: _id,
            title,
            description
        })

        await note.save();

        res.json({
            message: "Notes saved successfully!"
        });
    }
    catch(err){
        res.status(400).json({
            message: "Error saving the notes: " + err.message
        });
    }
});

// route to update the note
notesRouter.patch("/notes/:noteId", async (req, res) => {

    try{
        const {noteId} = req.params;

        if(!noteId){
            throw new Error("Note not found!");
        }

        const allowedUpdates = ["title", "description"];

        const isUpdateAllowed = Object.keys(req.body).every((k) => allowedUpdates.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not allowed!");
        }

        await Notes.findOneAndUpdate(
        {
            _id: noteId,
            userId: req.user._id
        },
        req.body
        );

        res.json({
            message: "Notes updated successfully!"
        })
    }
    catch(err){
        res.status(400).json({
            message: "Error adding the note: " + err.message
        });
    }
    
});

notesRouter.delete("/notes/:noteId", async (req, res) => {

    try{
        const {noteId} = req.params;

        if(!noteId){
            throw new Error("Note not found!");
        }

        await Notes.findOneAndDelete({
            _id: noteId,
            userId: req.user._id
        });

        res.json({
            message: "Note deleted successfully!"
        });
    }
    catch(err){
        res.status(400).json({
            message:  "Error deleting the note: " + err.message
        });
    }

});


module.exports = notesRouter;
