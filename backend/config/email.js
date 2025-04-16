const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,

    secure: true,

    auth: {
        user: 'ajalaemmanueloluwashola@gmail.com',
  
        pass: 'zkcq vzql aidi fcaq'
    }
})

module.exports = transporter  