/*
  Warnings:

  - You are about to alter the column `account_number` on the `bank_accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(10)`.
  - You are about to alter the column `card_number` on the `cards` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(19)`.

*/
-- AlterTable
ALTER TABLE "bank_accounts" ALTER COLUMN "account_number" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "card_number" SET DATA TYPE VARCHAR(19);
