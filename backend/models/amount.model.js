const mongoose = require("mongoose");
const amountSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const amountModel = mongoose.model("amount", amountSchema);
module.exports = amountModel;