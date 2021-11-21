/*
  Warnings:

  - You are about to drop the column `url` on the `Page` table. All the data in the column will be lost.
  - Added the required column `path` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "url",
ADD COLUMN     "path" TEXT NOT NULL;
