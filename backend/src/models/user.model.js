const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim : true,
        required : [true , "Full Name is necessary!"],
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Username is necessary!"],
        unique: [true, "Username is already exists!"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is necessary!"],
        unique: [true, "Email is already exists!"],
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invalid Email type!"]
    },
    branch: {
        type: String,
        trim: true,
        required: [true, "Branch is necessary!"],
    },
    session: {
        type: String, 
        trim: true,
        required: [true, "Session is necessary!"],
    },
    password: {
        type: String,       
        required: [true, "Password is necessary!"],
        minlength : [6, "Atleast put 6 characters!"],
        trim: true,
        required: [true, "Password is necessary!"],
    },
    semester: {
        type: String,     
        trim: true,
        required: [true, "Semester is necessary!"],
    },
    college : {
        type: String,   
        trim: true,
        required: [true, "College is necessary!"],   
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);