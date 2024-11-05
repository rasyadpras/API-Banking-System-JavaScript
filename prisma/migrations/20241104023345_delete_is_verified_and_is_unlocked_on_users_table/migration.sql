/*
  Warnings:

  - You are about to drop the column `is_unlocked` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_unlocked",
DROP COLUMN "is_verified";
