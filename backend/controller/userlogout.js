
const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


async function userlogoutController(req, res) {
    // const { email, password } = req.body
    try {
      
       res.clearCookie("token") 
       
       res.json({
        message: "logout sucess",
        error: false,
        sucess: true, 
        data:[]
       })
 
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            sucess: false
        })

    }
}
module.exports =  userlogoutController