const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
        });
        console.log("MongoDB connected !!");
        
    }catch(err){
        console.error("Error connecting during db",err.message);
        process.exit(1);
        
    }
} 

module.exports = connectDb;