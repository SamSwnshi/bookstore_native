import { Router } from "express";
import { login, signup } from "../controller/user.controller.js";
const user = Router();

user.post("/login",login)
user.post("/register",signup)

export default user;