/*
  Warnings:

  - The `identity_type` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `destination_account_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `source_account_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `destination_account_number` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_account_number` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Identity" AS ENUM ('identity_card', 'driver_license', 'other');

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_destination_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_source_account_id_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "identity_type",
ADD COLUMN     "identity_type" "Identity" NOT NULL DEFAULT 'identity_card';

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "destination_account_id",
DROP COLUMN "source_account_id",
ADD COLUMN     "destination_account_number" TEXT NOT NULL,
ADD COLUMN     "source_account_number" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_source_account_number_fkey" FOREIGN KEY ("source_account_number") REFERENCES "accounts"("account_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destination_account_number_fkey" FOREIGN KEY ("destination_account_number") REFERENCES "accounts"("account_number") ON DELETE RESTRICT ON UPDATE CASCADE;
