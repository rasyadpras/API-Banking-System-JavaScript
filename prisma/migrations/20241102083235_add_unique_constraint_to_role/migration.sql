/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "role" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_key" ON "roles"("role");
