import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { registerSchema } from "~/components/auth/registerSchema";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const data = registerSchema.parse({
    email: body?.email,
    password: body?.password,
    passwordRepeat: body?.passwordRepeat,
  });

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    if (existingUser.password !== null) {
      throw createError({ statusMessage: "apiResponses.emailTaken" });
    } else {
      // User previously registered without a password - provider.
      const hashedPassword = await bcrypt.hash(body.password, 10);

      try {
        const code = await sendVerificationEmail(body.email);

        const updatedUser = await prisma.user.update({
          where: { email: body.email },
          data: {
            password: hashedPassword,
            emailVerified: false,
            emailVerificationCode: code,
          },
        });

        return {
          success: true,
          message: "apiResponses.accountCreated",
        };
      } catch (error) {
        console.log(error);
        throw createError({
          statusCode: 500,
          statusMessage: "apiResponses.failedToCreateAccount",
        });
      }
    }
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const code = await sendVerificationEmail(body.email);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        emailVerified: false,
        emailVerificationCode: code,
      },
    });
    return {
      success: true,
      statusMessage: "apiResponses.accountCreated",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "apiResponses.failedToCreateAccount",
    });
  }
});

export const sendVerificationEmail = async (email: string) => {
  try {
    const { sendMail } = useNodeMailer();
    const config = useRuntimeConfig();

    const emailVerificationCode = await bcrypt.hash(Date.now().toString(), 10);

    const confirmationUrl = `${config.public.APP_BASE_URI}/profile/confirm-email?code=${emailVerificationCode}`;
    const htmlContent = `
      <p>Your confirmation link: <a href="${confirmationUrl}">Click here to confirm your account</a></p>
    `;

    await sendMail({
      subject: "Account confirmation",
      to: email,
      html: htmlContent,
    });

    return emailVerificationCode;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "apiResponses.failedToSendVerificationEmail",
    });
  }
};
