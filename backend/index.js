import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const port = process.env.PORT || 8080;
const app = express();


app.use("/api/auth",userRoutes)

app.listen(port,() =>{
    console.log(`Server is Started at Port: ${port}`)
})