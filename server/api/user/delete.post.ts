import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "apiResponses.userNotAuthenticated",
      });
    }

    const body = await readBody(event);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (
      (!user ||
        !user.password ||
        !(await bcrypt.compare(body.password, user.password))) &&
      session.user.provider === ""
    ) {
      throw createError({
        statusCode: 401,
        statusMessage: "apiResponses.incorrectPassword",
      });
    }

    await prisma.chat.deleteMany({ where: { userId: session.id } });
    await prisma.user.delete({ where: { email: session.user.email } });

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    throw createError({
      statusCode: 401,
      statusMessage: error.statusMessage,
    });
  }
});
