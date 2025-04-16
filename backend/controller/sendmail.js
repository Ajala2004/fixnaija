const express = require("express");
const nodemailer = require("nodemailer");





// API Endpoint to Send Emails
const sendmail = async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  try {
    // Email transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use "hotmail", "yahoo", etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email details
    const mailOptions = {
      from: email, // Sender's email
      to: process.env.EMAIL_USER, // Your email to receive messages
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message. Try again later." });
  }
};


module.exports = sendmail;