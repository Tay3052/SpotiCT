/*
  Warnings:

  - You are about to drop the `Gender` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_genderId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "genderId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Gender";
