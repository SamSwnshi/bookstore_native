import mongoose from "mongoose";

const config = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MONGO_DB")
    } catch (error) {
        console.log(error.message,"ERROR in Connecting to MONGO_DB")
    }
}

export default config;