import { z } from "zod";

export const withdrawSchema = z.object({
  amountTobeWithDrawn: z.number().positive("Amount must be positive"),
});

export const depositSchema = z.object({
  amountTobeDeposited: z.number().positive("Amount must be positive"),
});

export const transferSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  moneyAmount: z.number().positive("Amount must be positive"),
});
