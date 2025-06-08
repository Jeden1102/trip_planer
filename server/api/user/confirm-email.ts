import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: "apiResponses.missingCode",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { emailVerificationCode: body.code, emailVerified: true },
    });

    if (user) {
      return {
        success: true,
        message: "apiResponses.emailConfirmed",
      };
    }

    await prisma.user.update({
      where: { emailVerificationCode: body.code },
      data: {
        emailVerified: true,
      },
    });

    return {
      success: true,
      message: "apiResponses.emailConfirmed",
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "apiResponses.failedToConfirmEmail",
    });
  }
});
