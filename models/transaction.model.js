import mongoose, { Types } from "mongoose";
const transactionSchema = new mongoose.Schema({
    accountId: {
        type: Types.ObjectId,
        required: true,
        ref: "Account"
    },
    amount: {
        type: Number,
        required:true,
    },
    balanceBefore: {
        type: Number,
        required:true,
    },
    balanceAfter: {
        type: Number,
        required:true,
    },
    type: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        required:true
    },


});
export const transactionModel = mongoose.model("Transaction", transactionSchema);
