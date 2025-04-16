const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()
const connectDb = require('./config/db')
const router = require('./routes/index')
const cookieParser = require("cookie-parser")
const app = express()
app.use(cors({
    origin: "http://localhost:5173",   
    credentials: true  
   
}))  
app.use(express.json())   
app.use(cookieParser())

app.use("/api",router)
const PORT = 4040 || process.env.PORT

connectDB().then(()=>{ 
     app.listen(PORT,()=>{
          console.log("connected to db")
          console.log("appp is running")
     })   
})  
 