const mongoose = require("mongoose");

const gapSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    gaps: {
        type: [Number],

        default: [1, 3, 7, 15, 30, 60, 120, 180, 240, 300, 360],

        validate(array){
            if(array.length() > 50){
                throw new Error("Exceeded Maximum Length!");
            }
        }
    }


},
{
    timestamps: true
});

module.exports = mongoose.model("Gaps", gapsSchema);

