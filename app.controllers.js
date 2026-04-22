import express from "express";
import { db } from "./DB/db.connection.js";
import { authRouter } from "./modules/auth/auth.controllers.js";
import { transactionRouter } from "./modules/transaction/transaction.controllers.js";
const app = express();
const port = process.env.PORT || 3000;
export const bootstrap = () => {
  db;
  app.use(express.json());
  app.use('/auth', authRouter)
  app.use('/transactions', transactionRouter)
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
