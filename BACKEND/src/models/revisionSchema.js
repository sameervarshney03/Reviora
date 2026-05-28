const mongoose = require("mongoose");


const revisionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    material: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Revision", revisionSchema);