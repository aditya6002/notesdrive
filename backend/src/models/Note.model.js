const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String,
        min: 3,
        max: 200,
    },
    content: {
        require: true,
        type: String,
    },
    tags: {
        require: true,
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
