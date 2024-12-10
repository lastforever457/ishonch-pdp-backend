-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'BLOCKED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
