import { findOne } from "../../DB/repository/db.repository.js";
import { accountModel } from "../../models/bankAccount.model.js";

export const getAccount = async (req, res) => {
  const userId = req.userId;
  const accountData = await findOne({
    model: accountModel,
    filter: {
      userId,
    },
  });
  res.status(200).json({ accountData });
};
