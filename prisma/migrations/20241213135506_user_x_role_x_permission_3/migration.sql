/*
  Warnings:

  - You are about to drop the `_UserPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserPermissions" DROP CONSTRAINT "_UserPermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserPermissions" DROP CONSTRAINT "_UserPermissions_B_fkey";

-- DropTable
DROP TABLE "_UserPermissions";
