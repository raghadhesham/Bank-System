import mongoose, { Types } from "mongoose";
const beneficiarySchema = new mongoose.Schema({
  ownerUserId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
  },
});
export const beneficiaryModel = mongoose.model(
  "Beneficiary",
  beneficiarySchema,
);
