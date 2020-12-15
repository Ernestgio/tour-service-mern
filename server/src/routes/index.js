const express = require('express')
const router = express.Router()
// const {ensureAuth,ensureGuest} = require("../middleware/auth")
//index routes


// router.get('/',ensureGuest,(req,res)=>{
//     //console.log(req.ip)
//     res.send('Login routes!')
// })
router.get('/',(req,res)=>{
    //console.log(req.ip)
    res.send('Login routes!')
})

module.exports = router