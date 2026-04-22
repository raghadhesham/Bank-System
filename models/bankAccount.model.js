import mongoose, { Types } from "mongoose";
const accountSchema = new mongoose.Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    accountNumber: {
        type: String,
        required:true,
    },
    balance: {
        type: Number,
        default:0
    },
    currency: {
        type: String,
        default:"EGP"
    },
    status: {
        type: String,
        default:"active"
    },


});
export const accountModel = mongoose.model("Account", accountSchema);
