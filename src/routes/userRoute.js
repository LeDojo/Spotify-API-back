import { Router } from "express";
import { saveUser } from "../controllers/userController";
const authRouter = Router();

authRouter.post("/register", saveUser);


export default authRouter