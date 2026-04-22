import { Router } from "express";
import { authenticate } from "../../middleware/authentication.js";
import {
  deposit,
  getATransaction,
  getTransactions,
  transfer,
  withdraw,
} from "./transaction.services.js";
import { validate } from "../../middleware/validation.js";
import { depositSchema } from "./transaction.validation.js";
export const transactionRouter = Router();
transactionRouter.get("/", authenticate, getTransactions);
transactionRouter.get("/:transactionId", authenticate, getATransaction);
transactionRouter.post(
  "/withdraw",
  authenticate,
  withdraw,
);
transactionRouter.post(
    "/deposit",
    authenticate,
  deposit,
);
transactionRouter.post(
  "/transfer",
  authenticate,
  validate(depositSchema),
  transfer,
);
