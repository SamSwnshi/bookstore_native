import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import connect from "./db/config.js"
import bookRoutes from "./routes/book.routes.js";
import cors from "cors"

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();


app.use(express.json())
app.use(cors());
app.use("/api/auth",userRoutes)
app.use("/api/book",bookRoutes)

app.listen(port,() =>{
    connect()
    console.log(`Server is Started at Port: ${port}`)
})