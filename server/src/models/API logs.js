const mongoose = require("mongoose")

const LogSchema = new mongoose.Schema({
    method:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('APILogs',LogSchema)