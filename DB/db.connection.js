import mongoose from "mongoose";

export const db = await mongoose.connect(process.env.MONGODB_URI);
