/*
  Warnings:

  - You are about to drop the column `numero` on the `Page` table. All the data in the column will be lost.
  - Added the required column `number` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "numero",
ADD COLUMN     "number" INTEGER NOT NULL;
