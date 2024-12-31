/*
  Warnings:

  - You are about to drop the column `stockId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_stockId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stockId";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "quantity",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "stock_product" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "productId" TEXT,
    "stockId" TEXT NOT NULL,

    CONSTRAINT "stock_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_product_id_key" ON "stock_product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_slug_key" ON "Stock"("slug");

-- AddForeignKey
ALTER TABLE "stock_product" ADD CONSTRAINT "stock_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_product" ADD CONSTRAINT "stock_product_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
