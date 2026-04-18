import express from "express";
import { db } from "./DB/db.connection.js";
const app = express();
const port = process.env.PORT || 3000;
export const bootstrap = () => {
  db;
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
