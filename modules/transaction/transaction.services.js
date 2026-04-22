import {
  findOne,
  find,
  findOneAndUpdate,
  create,
} from "../../DB/repository/db.repository.js";
import { transactionModel } from "../../models/transaction.model.js";
import { accountModel } from "../../models/bankAccount.model.js";
import {
  withdrawSchema,
  depositSchema,
  transferSchema,
} from "./transaction.validation.js";
import { db } from "../../DB/db.connection.js";
export const getTransactions = async (req, res) => {
  const userId = req.userId;
  const transactions = await find({
    model: transactionModel,
    filter: {
      userId,
    },
  });
  res.status(200).json({ transactions });
};
export const getATransaction = async (req, res) => {
  const userId = req.userId;
  const { transactionId } = req.params;
  const transaction = await findOne({
    model: transactionModel,
    filter: {
      _id: transactionId,
    },
  });
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  res.status(200).json({ transaction });
};
export const withdraw = async (req, res) => {
  try {
    const session = await db.startSession();
    await session.withTransaction(async () => {
      const userId = req.userId;
      const { amountTobeWithDrawn } = req.body;
      const account = await findOne({
        model: accountModel,
        filter: { userId },
        session,
      });
      if (!account) {
        throw new Error("Account not found");
      }
      const balance = account.balance;
      if (amountTobeWithDrawn > balance) {
        throw new Error("Your balance is not enough");
      }
      const newBalance = balance - amountTobeWithDrawn;
      await findOneAndUpdate({
        model: accountModel,
        filter: { userId },
        data: { $inc: { balance: -amountTobeWithDrawn } },
        session,
      });
      await create({
        model: transactionModel,
        data: {
          accountId: account._id,
          amount: amountTobeWithDrawn,
          balanceBefore: balance,
          balanceAfter: newBalance,
          type: "withdrawal",
          status: "completed",
        },
        session,
      });
      res.status(200).json({
        message: `Withdrawal Done Successfully, your balance now is ${newBalance}`,
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    await session.endSession();
  }
};
export const deposit = async (req, res) => {
  let session = await db.startSession();
  try {
    await session.withTransaction(async () => {
      const userId = req.userId;
      const { amountTobeDeposited } = req.body;
      console.log(amountTobeDeposited);
      console.log("userId",userId);
      
      const account = await findOne({
        model: accountModel,
        filter: { userId },
        session,
      });
      console.log("account", account);

      if (!account) {
        throw new Error("Account not found");
      }
      console.log(userId);

      const balance = account.balance;
      const newBalance = balance + amountTobeDeposited;
      await findOneAndUpdate({
        model: accountModel,
        filter: { userId },
        data: { balance: newBalance },
        session,
      });
      await create({
        model: transactionModel,
        data: {
          accountId: account._id,
          amount: amountTobeDeposited,
          balanceBefore: balance,
          balanceAfter: newBalance,
          type: "deposit",
          status: "completed",
        },
        session,
      });
      result = newBalance;
    });
    res.status(200).json({
      message: `Money Deposited Done Successfully, your balance now is ${result}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    await session.endSession();
  }
};
export const transfer = async (req, res) => {
  try {
    const session = await db.startSession();
    await session.withTransaction(async () => {
      const userId = req.userId;
      const { accountNumber, moneyAmount } = req.body;
      const senderAccount = await findOne({
        model: accountModel,
        filter: { userId },
        session,
      });
      if (!senderAccount) {
        throw new Error("Your account not found");
      }
      const senderBalance = senderAccount.balance;
      if (moneyAmount > senderBalance) {
        throw new Error("Your balance is not enough");
      }
      const recipientAccount = await findOne({
        model: accountModel,
        filter: { accountNumber },
        session,
      });
      if (!recipientAccount) {
        throw new Error("Recipient account not found");
      }
      if (senderAccount._id.toString() === recipientAccount._id.toString()) {
        throw new Error("Cannot transfer to your own account");
      }
      const newSenderBalance = senderBalance - moneyAmount;
      await findOneAndUpdate({
        model: accountModel,
        filter: { _id: senderAccount._id },
        data: { $inc: { balance: -moneyAmount } },
        session,
      });
      await findOneAndUpdate({
        model: accountModel,
        filter: { _id: recipientAccount._id },
        data: { $inc: { balance: moneyAmount } },
        session,
      });
      await create({
        model: transactionModel,
        data: {
          accountId: senderAccount._id,
          amount: moneyAmount,
          balanceBefore: senderBalance,
          balanceAfter: newSenderBalance,
          type: "transfer",
          status: "completed",
        },
        session,
      });
      res.status(200).json({
        message: `Transfer Done Successfully, your balance now is ${newSenderBalance}`,
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    await session.endSession();
  }
};
