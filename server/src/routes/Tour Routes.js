const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const TourService = require("../models/Tour Service")
// const {ensureAuth,ensureGuest} = require("../middleware/auth")


//Return all service
router.get('/',(req,res)=>{
    TourService.find({},(err,foundServices)=>{
        if(err){
            console.log(err)
            res.status(404).json({message:"Resource not found!"})
        }
        else{
            res.status(200).json(foundServices);
        }
    })
})

// Return service by id
router.get('/:id',(req,res)=>{
    requestedID = req.params.id
    TourService.findById(requestedID,(err,foundService)=>{
        if(err){
            console.log(err)
            res.status(404).json({message:"Error, Not found"})
        }
        else{
            if(foundService.length == 0){
                res.status(400).json({message:"Please check id"})
            }
            else{
                res.status(200).json(foundService)
            }
        }
    })
})

//get new service form
router.get('/new',(req,res)=>{
    res.status(200).json({message:"Please create new tour service"})
})


//post new service to db
router.post('/new',async (req,res)=>{
    newservice ={
        name: req.body.name,
        price: parseInt(req.body.price),
        unit: req.body.unit,
        serviceType : req.body.serviceType,
        description: req.body.description,
        vendorContact: req.body.vendorContact,
        picturePath: req.body.picturePath
    }

    try{
        await TourService.create(newservice)
        res.status(201).json(newservice)
    } catch(err){
        res.status(409).json({message:'Create failed'})
    }
})

//Delete routes
router.delete("/:id",(req,res)=>{
    requestedID = req.params.id
    TourService.findByIdAndRemove(requestedID,(err,deletedService)=>{
        if(err){
            console.log(err)
            res.status(500).json({message:"delete error"})
        }
        else{
            res.status(200).json({message:"delete success"})
        }
    })
})

// Update routes
router.put("/:id",async (req,res)=>{
    requestedID = req.params.id
    
    newData = {
        name: req.body.name,
        price: parseInt(req.body.price),
        unit: req.body.unit,
        serviceType : req.body.serviceType,
        description: req.body.description,
        vendorContact: req.body.vendorContact,
        picturePath: req.body.picturePath,
        _id:requestedID
    }
    try{
        await TourService.findByIdAndUpdate(requestedID, newData, { new: true });
        res.status(201).json(newData)
    }catch(err){
        console.log(err)
    }
})

// get update form and delete button
router.get('/:id/update',(req,res)=>{
    requestedID = req.params.id
    TourService.findById(requestedID,(err,foundService)=>{
        if(err){
            console.log(err)
            res.status(404).json({message:"Error, Not found"})
        }
        else{
            if(foundService.length == 0){
                res.status(400).json({message:"Please check id"})
            }
            else{
                res.status(200).json(foundService)
            }
        }
    })
})

module.exports = router