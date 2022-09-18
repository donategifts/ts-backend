/*
  Warnings:

  - You are about to drop the column `addressId` on the `Agency` table. All the data in the column will be lost.
  - Added the required column `agencyId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "agencyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "addressId";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
