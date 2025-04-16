const express = require('express')
const multer = require("multer");
const userdatails = require("../controller/getuserdetails")
const alluser = require("../controller/allusers")
const approvedUsers = require("../controller/approveusers")
const rating = require("../controller/rating")
const mail = require("../controller/sendmail")
const router = express.Router() 
const completeProfile  = require("../controller/completeProfile");
const approve = require("../controller/approve");
const unapprove = require("../controller/unapprove"); 
// const upload = require("../config/awsConfig"); // Multer S3 configuration
const authMiddleware = require("../middleware/authtoken");
const isadmin = require("../middleware/isadmin");
const storage = multer.memoryStorage();
const usersignupController = require("../controller/registerUser")
const usersigninController = require("../controller/loginUser")
const userlogout = require("../controller/userlogout")
router.post("/signup", usersignupController) 
router.post("/signin", usersigninController)
router.post("/logout", userlogout)
router.get("/allusers",isadmin , alluser) 
router.get("/profile", authMiddleware,userdatails)
router.post("/approve-user/:id",isadmin, approve)
router.post("/unapprove-user/:id", unapprove)
router.get("/approved-users", approvedUsers)
router.post('/rate',rating)
router.post("/sendemail", mail)
// Setup multer to handle file uploads    
const upload = multer({ storage });

// Route to complete profile, using multer for file handling and protect for authentication
router.post(
  "/completeProfile", 
  authMiddleware, // Authenticate the user
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "drivingLicense", maxCount: 1 },
  ]),
  completeProfile // Controller to handle the logic
); 

module.exports = router          