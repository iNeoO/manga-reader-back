/*
  Warnings:

  - Added the required column `lastPageReadId` to the `ChapterRead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChapterRead" ADD COLUMN     "lastPageReadId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ChapterRead" ADD CONSTRAINT "ChapterRead_lastPageReadId_fkey" FOREIGN KEY ("lastPageReadId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
