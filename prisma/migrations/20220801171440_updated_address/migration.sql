/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "streetNumber" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;
