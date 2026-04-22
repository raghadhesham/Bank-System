import {
  extractTokenFromHeaders,
  verifyAccessToken,
} from "../common/utils/token.js";
import { findById } from "../DB/repository/db.repository.js";
import { userModel } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    console.log("alo");

    const token = await extractTokenFromHeaders(req.headers.authorization);
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }
    const decoded = await verifyAccessToken(token);
    console.log(decoded);
    req.user = decoded;
    req.userId = decoded._id;
    req.role = decoded.role;
    req.email = decoded.email;
    console.log(req.userId);
    

    // const user = await findById({
    //   model: userModel,
    //   id: req.userId,
    // });
    // console.log(user);

    // console.log(req.userId);

    // if (!user) {
    //   throw new Error("Unauthorized");
    // }
    next();
  } catch (error) {
    throw new Error(error);
  }
};
