// Tour service object
const mongoose = require("mongoose")


const TourServiceSchema = new mongoose.Schema({
    name: String,
    price: Number,
    unit: String,
    serviceType : String,
    description: String,
    vendorContact: String,
    picturePath: String
})

module.exports = mongoose.model('TourService',TourServiceSchema)