import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import connect from "./db/config.js"

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();


app.use("/api/auth",userRoutes)

app.listen(port,() =>{
    connect()
    console.log(`Server is Started at Port: ${port}`)
})