import {
  extractTokenFromHeaders,
  verifyAccessToken,
} from "../common/utils/token.js";

export const authenticate = async (headers) => {
  return (req, res) => {
    const token = extractTokenFromHeaders(headers);
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    req.userId = decoded._id;
    req.role = decoded.role;
      req.email = decoded.email;
      if (!user) {
        throw new Error("Unauthorized");
      }
      
    return token;
  };
};
