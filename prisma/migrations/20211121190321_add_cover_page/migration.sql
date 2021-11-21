/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coverPageId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Manga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coverPageId]` on the table `Manga` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coverPageId` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPageId` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "coverPageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Manga" ADD COLUMN     "coverPageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_id_name_key" ON "Chapter"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_coverPageId_key" ON "Chapter"("coverPageId");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_name_key" ON "Manga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_coverPageId_key" ON "Manga"("coverPageId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_coverPageId_fkey" FOREIGN KEY ("coverPageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_coverPageId_fkey" FOREIGN KEY ("coverPageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
