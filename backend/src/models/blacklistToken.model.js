const mongoose = require("mongoose");


const blacklistTokenSchema = new mongoose.Schema({
    jwtToken:{
        type:String,
        required:true,
        unique:true
    },
    expireAt:{
        type:Date,
        required:true,
    }
})


blacklistTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })


module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema)