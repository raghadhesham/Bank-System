import {Router} from "express";
import { authenticate } from "../../middleware/authentication.js";
import { depositSchema, transferSchema, withdrawSchema } from "./transaction.validation.js";
export const transactionRouter = Router();
transactionRouter.get("/transactions",authenticate, getTransactions);
transactionRouter.get("/transactions/:transactionId", authenticate, getATransaction);
transactionRouter.post("/transactions/withdraw", authenticate,withdrawSchema, withdraw);
transactionRouter.post("/transactions/deposit", authenticate,depositSchema, deposit);
transactionRouter.post("/transactions/transfer", authenticate,transferSchema, transfer);