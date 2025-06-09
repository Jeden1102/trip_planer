import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { resetPasswordSchema } from "~/components/auth/resetPasswordSchema";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const data = resetPasswordSchema.parse({
    password: body?.password,
    passwordRepeat: body?.passwordRepeat,
    email: body?.email,
    code: body?.code,
  });

  if (!data.email || !data.code) {
    throw createError({
      statusCode: 400,
      statusMessage: "apiResponses.invalidResetRequest",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.passwordResetCode) {
      throw createError({
        statusCode: 400,
        statusMessage: "apiResponses.invalidResetRequest",
      });
    }

    if (data.code !== user.passwordResetCode) {
      throw createError({
        statusCode: 400,
        statusMessage: "apiResponses.invalidResetCode",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.update({
      where: { email: data.email },
      data: {
        password: hashedPassword,
        passwordResetCode: null,
      },
    });

    return {
      success: true,
      statusMessage: "apiResponses.passwordResetSuccess",
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "apiResponses.failedToResetPassword",
    });
  }
});
