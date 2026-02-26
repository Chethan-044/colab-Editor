const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDb = require("./config/dbconnect.js")

dotenv.config();



const PORT = process.env.PORT;
const app = express();


connectDb();


app.listen(PORT,(req,res)=>{
    console.log("App running at port",PORT);
    
})