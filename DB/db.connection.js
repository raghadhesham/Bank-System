import mongoose from "mongoose";
import { config } from "../config/configServices.js";

export const db = await mongoose.connect(`mongodb+srv://hraghad618_db_user:KqVnb6Nlnh2LD4rH@cluster0.puohxh5.mongodb.net/?appName=Cluster0/bank`);
 