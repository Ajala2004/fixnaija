const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const transporter = require("../config/email")

async function resetpassword(req, res) {
    const {token} = req.params;
    const {password} = req.body;
    try {
       
          const decode = jwt.JsonWebTokenError(token,JWT_SECRETT )
          const user = User.findById(decode.id)
          if (!user){
            res.status(400).send("invalid token")
          }
          const salt = bcrypt.genSaltSync(10);
           user.password = await bcrypt.hashSync(password, salt);
           await user.save()

     res.status(200).json({
           
            sucess: true,
            error: false,
            message: "password successfull"
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            sucess: false
        })

    }
}
module.exports =  resetpassword