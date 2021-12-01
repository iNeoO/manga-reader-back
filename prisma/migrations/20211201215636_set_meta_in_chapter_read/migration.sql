/*
  Warnings:

  - A unique constraint covering the columns `[mangaId,name]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mangaId,number]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterId,number]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `ChapterRead` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Chapter_id_name_key";

-- AlterTable
ALTER TABLE "ChapterRead" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_mangaId_name_key" ON "Chapter"("mangaId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_mangaId_number_key" ON "Chapter"("mangaId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Page_chapterId_number_key" ON "Page"("chapterId", "number");
