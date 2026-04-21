import { z } from "zod";

export const signupSchema = {
  body: z
    .object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      cpassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.cpassword, {
      message: "Passwords don't match",
      path: ["cpassword"],
    }),
};

export const loginSchema = {
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
};
