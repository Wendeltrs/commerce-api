/*
  Warnings:

  - The `transactionId` column on the `payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "PaymentMethod" ADD VALUE 'BOLETO';

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "method" DROP NOT NULL,
DROP COLUMN "transactionId",
ADD COLUMN     "transactionId" UUID;
