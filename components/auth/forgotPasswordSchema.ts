import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(2).max(50).email(),
});

export type AuthSchema = z.infer<typeof forgotPasswordSchema>;
