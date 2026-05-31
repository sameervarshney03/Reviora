const mongoose = require("mongoose");

// schema for revision data
const revisionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    material: {
        type: String,
        required: true,
        maxLength: 5000
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Revision", revisionSchema);