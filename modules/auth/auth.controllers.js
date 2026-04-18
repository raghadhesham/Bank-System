import { Router } from "express";
import { login, signup } from "./auth.services.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
export const authRouter = Router();
authRouter.post("/signup", signupSchema, signup);
authRouter.post("/login", loginSchema, login);
