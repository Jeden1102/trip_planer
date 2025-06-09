import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(2).max(50),
    passwordRepeat: z.string().min(2).max(50),
    code: z.string(),
    email: z.string().min(2).max(50).email(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords must match",
    path: ["passwordRepeat"],
  });

export type AuthSchema = z.infer<typeof resetPasswordSchema>;
