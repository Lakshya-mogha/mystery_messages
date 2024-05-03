import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, "username should be at least 4 characters")
  .max(10, "username should not be more than 10 characters")
  .trim()
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "username should not contain any special characters"
  );

export const signUpValidation = z.object({
  usernameValidation: usernameValidation,
  email: z.string().email({message:'invalid email'}),
  password : z.string().min(6,'password must be more than 6 characters').max(10,'password can not be more than 10 characters')
});
