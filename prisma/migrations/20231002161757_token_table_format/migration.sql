/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `APITokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `apitokens` MODIFY `token` VARCHAR(1000) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `APITokens_token_key` ON `APITokens`(`token`);
