const mongoose = require("mongoose");


// schema for notes data
const notesSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        maxLength: 100
    },

    description: {
        type: String,
        required: true,
        maxLength: 2000
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Notes", notesSchema);