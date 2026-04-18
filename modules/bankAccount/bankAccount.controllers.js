import { Router } from "express";
export const bankAccountRouter = Router();
import { getAccount } from "./bankAccount.services.js"; 
import { authenticate } from "../../middleware/authentication.js";
bankAccountRouter.get("/account",authenticate, getAccount);