/*
  Warnings:

  - You are about to drop the column `userId` on the `organization` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `invitation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invitation` DROP FOREIGN KEY `Invitation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `organization` DROP FOREIGN KEY `Organization_userId_fkey`;

-- AlterTable
ALTER TABLE `invitation` ADD COLUMN `organizationId` INTEGER NOT NULL,
    ADD COLUMN `reatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `organization` DROP COLUMN `userId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `organizationId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
