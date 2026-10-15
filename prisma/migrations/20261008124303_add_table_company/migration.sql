/*
  Warnings:

  - You are about to drop the column `state` on the `address` table. All the data in the column will be lost.
  - Added the required column `country_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_abbr` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "state",
ADD COLUMN     "country_id" VARCHAR(10) NOT NULL,
ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "state_abbr" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "companyId" UUID NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "length" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "document" VARCHAR(100),
ADD COLUMN     "phone" VARCHAR(30);

-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "document" VARCHAR(30) NOT NULL,
    "userId" UUID NOT NULL,
    "addressId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_userId_key" ON "company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "company_addressId_key" ON "company"("addressId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
