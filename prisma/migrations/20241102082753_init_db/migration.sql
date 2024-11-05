-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('administrator', 'officer', 'customer');

-- CreateEnum
CREATE TYPE "BankAccountStatus" AS ENUM ('active', 'closed');

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('identity_card', 'passport', 'driver_license', 'student_card', 'other');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "AccountUserStatus" AS ENUM ('active', 'not_verified', 'locked');

-- CreateEnum
CREATE TYPE "TransactionCashType" AS ENUM ('deposit', 'withdrawal');

-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('regular_savings', 'business_savings', 'students_savings', 'savings_plan', 'other_savings');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit_card', 'debit_card');

-- CreateEnum
CREATE TYPE "CardPrincipal" AS ENUM ('visa', 'mastercard', 'gpn', 'jcb', 'union_pay', 'american_express', 'no_principal', 'other');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('active', 'blocked', 'expired');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status_account" "AccountUserStatus" NOT NULL DEFAULT 'not_verified',
    "profile_id" UUID,
    "login_attempt" INTEGER NOT NULL DEFAULT 0,
    "is_unlocked" BOOLEAN NOT NULL DEFAULT true,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birth_date" DATE NOT NULL,
    "identity_type" "IdentityType" NOT NULL,
    "identity_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'customer',

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_branches" (
    "id" UUID NOT NULL,
    "branch_code" VARCHAR(3) NOT NULL,
    "branch_name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "bank_branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "account_number" VARCHAR(10) NOT NULL,
    "bank_account_type" "BankAccountType" NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "status_bank_account" "BankAccountStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" UUID NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "card_type" "CardType" NOT NULL,
    "card_number" VARCHAR(16) NOT NULL,
    "principal" "CardPrincipal" NOT NULL,
    "expired_date" DATE NOT NULL,
    "cvv" VARCHAR(4) NOT NULL,
    "card_status" "CardStatus" NOT NULL DEFAULT 'active',
    "active_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer_transactions" (
    "id" UUID NOT NULL,
    "source_account_id" UUID NOT NULL,
    "destination_account_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transfer_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash_transactions" (
    "id" UUID NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "transaction_type" "TransactionCashType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cash_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRoles" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_profile_id_key" ON "users"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_identity_number_key" ON "profiles"("identity_number");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_branches_id_key" ON "bank_branches"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_branches_branch_code_key" ON "bank_branches"("branch_code");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_id_key" ON "bank_accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_account_number_key" ON "bank_accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "cards_id_key" ON "cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_card_number_key" ON "cards"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "transfer_transactions_id_key" ON "transfer_transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cash_transactions_id_key" ON "cash_transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRoles_AB_unique" ON "_UserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRoles_B_index" ON "_UserRoles"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "bank_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_transactions" ADD CONSTRAINT "transfer_transactions_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_transactions" ADD CONSTRAINT "transfer_transactions_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_transactions" ADD CONSTRAINT "cash_transactions_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
