const mongoose = require("mongoose");
const TourService = require('./models/Tour Service')

tourData = [
    {
        name: "Rent Quality Tent",
        price: 100000,
        unit: "Malam",
        serviceType : "Renting",
        description: "Rent new, clean, and warm tent for cheap",
        vendorContact: "RentGoodtents@email.com",
        picturePath: "https://images.unsplash.com/photo-1548109465-dbf58cfd298f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHRlbnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Best Porter Service",
        price: 300000,
        unit: "Porter/Malam",
        serviceType : "Porter Service",
        description: "Use our porter and Tour Guide Service for ease and safety",
        vendorContact: "Mountainporter@email.com",
        picturePath: "https://www.superadventure.co.id/uploads/news/2020/09/21/67fa9b0e0148.jpg"
    },
    {
        name: "Rent beautiful Campground",
        price: 200000,
        unit: "Malam",
        serviceType : "Camping Ground rent",
        description: "Watch the stars and other majestic views at our campground!",
        vendorContact: "MajesticCampground@email.com",
        picturePath: "https://images.unsplash.com/photo-1516361728389-998730856765?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHRlbnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
]

function seedDB(){
    try{
        tourData.forEach((seed)=>{
            TourService.create(seed,(err,tourService)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Added new Tour Service");               
                }
            });
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = seedDB