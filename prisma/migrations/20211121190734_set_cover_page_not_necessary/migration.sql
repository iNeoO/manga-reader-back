-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_coverPageId_fkey";

-- DropForeignKey
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_coverPageId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "coverPageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Manga" ALTER COLUMN "coverPageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_coverPageId_fkey" FOREIGN KEY ("coverPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_coverPageId_fkey" FOREIGN KEY ("coverPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
