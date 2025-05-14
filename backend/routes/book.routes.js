import { Router } from "express";
import {getAllBook,createBook} from "../controller/book.controller.js";
import auth from "../middleware/auth.middleware.js"
const book = Router();

book.get("/all",getAllBook)
book.post("/create",auth,createBook)

export default book;