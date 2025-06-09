/*
  Warnings:

  - A unique constraint covering the columns `[passwordResetCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordResetCode_key" ON "User"("passwordResetCode");
