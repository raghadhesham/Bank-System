import { hash, compare } from "bcrypt";
import { userModel } from "../../models/user.model.js";
import { findOne, create } from "../../DB/repository/db.repository.js";
import {
  createTokenPayload,
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/token.js";
import { signupSchema, loginSchema } from "./auth.validation.js";

export const signup = async (req, res) => {
  const validatedData = signupSchema.parse(req.body);
  const { firstName, lastName, email, password } = validatedData;
  const hashed = await hash(password, 12);
  const userExists = await findOne({
    model: userModel,
    filter: { email },
  });
  if (userExists) {
    throw new Error("email already exists");
  }
  const user = await create({
    model: userModel,
    data: { firstName, lastName, email, password: hashed },
  });
  res.status(201).json({ message: "User created successfully" });
};
export const login = async (req, res) => {
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;
  const user = await findOne({
    model: userModel,
    filter: { email },
    select: "role",
  });
  if (!user) {
    throw new Error("user doesn't exist");
  }
  if (!(await compare(password, user.password))) {
    throw new Error("Passwords don't match");
  }
  const userId = user._id;
  const payload = createTokenPayload({ email, userId, role: user.role });
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  res.status(200).json({
    message: "Welcome to our bank",
    data: {
      accessToken,
      refreshToken,
    },
  });
};
