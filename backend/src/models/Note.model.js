const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        min: 3,
        max: 200,
    },
    file: {
        required: true,
        type: String,
    },
    tags: {
        required: true,
        type: Array,
        min: 1,
        max: 10,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});


module.exports = mongoose.model("noteModel", noteSchema);
