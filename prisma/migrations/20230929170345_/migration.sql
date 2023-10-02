/*
  Warnings:

  - You are about to drop the column `reatedAt` on the `invitation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invitation` DROP COLUMN `reatedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
