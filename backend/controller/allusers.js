const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


async function alluserController(req, res) {
    // const { email, password } = req.body
    try {
       
         
        const alluser = await User.find()
        
       res.json({
        data:alluser,  
        sucess:true,
        error: false,
        message: "all users"
       })
 
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            sucess: false
        })

    }
}
module.exports = alluserController