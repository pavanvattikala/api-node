-- DropForeignKey
ALTER TABLE `invitation` DROP FOREIGN KEY `Invitation_organizationId_fkey`;

-- AlterTable
ALTER TABLE `invitation` MODIFY `organizationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
