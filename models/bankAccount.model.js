import mongoose, { Types } from "mongoose";
const accountSchema = new mongoose.Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    accountNumber: {
        type: Number,
        required:true,
    },
    balance: {
        type: Number,
        required:true,
    },
    currency: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true
    },


});
export const accountModel = mongoose.model("Account", accountSchema);
