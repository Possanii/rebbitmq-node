/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_in_cents` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `price_in_cents` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_in_cents` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "price_in_cents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "price_in_cents",
ADD COLUMN     "total_in_cents" INTEGER NOT NULL;
