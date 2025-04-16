const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const transporter = require("../config/email")

async function forgotpassword(req, res) {
    // const { email, password } = req.body
    const { email } = req.body;
    try {


        const user = await User.findOne({ email })
        console.log("se", user)
        if (!user) {
            return res.status(400).send("account does not exist")
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRETT, { expiresIn: '1hr' })
          


        const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`
        const mailOptions = {
            to: user.email,
            from: "ajalaemmaueloluwashola@gmail.com",
            subject: 'password reset',
            text: `you're receiving this email because  you  requested to reset the password, click here to reset your password: ${resetUrl}`


        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            }

        })
        res.status(200).json({

            sucess: true,
            error: false,
            message: "reset sent"
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            sucess: false
        })

    }
}
module.exports = forgotpassword