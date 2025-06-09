import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const email = body?.email;

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "apiResponses.emailRequired",
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      success: true,
      statusMessage: "apiResponses.passwordResetSent",
    };
  }

  try {
    const resetCode = await generateResetCode(email);
    await prisma.user.update({
      where: { email },
      data: {
        passwordResetCode: resetCode,
      },
    });

    return {
      success: true,
      statusMessage: "apiResponses.passwordResetSent",
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "apiResponses.failedToSendResetEmail",
    });
  }
});

export const generateResetCode = async (email: string) => {
  const { sendMail } = useNodeMailer();
  const config = useRuntimeConfig();

  const resetCode = await bcrypt.hash(Date.now().toString() + email, 10);
  const encoded = encodeURIComponent(resetCode);

  const resetUrl = `${
    config.public.APP_BASE_URI
  }/reset-password?code=${encoded}&email=${encodeURIComponent(email)}`;
  const htmlContent = `
    <p>If you requested a password reset, click the link below:</p>
    <a href="${resetUrl}">Reset your password</a>
  `;

  await sendMail({
    subject: "Reset your password",
    to: email,
    html: htmlContent,
  });

  return resetCode;
};
