import * as z from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(2).max(50).email(),
    password: z.string().min(2).max(50),
    passwordRepeat: z.string().min(2).max(50),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords must match",
    path: ["passwordRepeat"],
  });

export type AuthSchema = z.infer<typeof registerSchema>;
