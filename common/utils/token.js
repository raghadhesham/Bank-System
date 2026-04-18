import * as jwt from "jsonwebtoken";
export const createTokenPayload = async (payload) => {
  return payload;
};
export const generateAccessToken = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
export const generateRefreshToken = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
export const verifyAccessToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
export const verifyRefreshToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
export const extractTokenFromHeaders = async (authHeaders) => {
  if (!authHeaders) {
    throw new Error("no token provided");
  }
  const prefix = authHeaders.split(" ")[0];
  if (!prefix) {
    throw new Error("No prefix provided");
  }
  const token = authHeaders.split(" ")[1];
  return token;
};
