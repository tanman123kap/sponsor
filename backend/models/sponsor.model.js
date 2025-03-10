const mongoose = require("mongoose");
const sponsorSchema = mongoose.Schema({
    sponsor_id: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const sponsorModel = mongoose.model("data", sponsorSchema);
module.exports = sponsorModel;