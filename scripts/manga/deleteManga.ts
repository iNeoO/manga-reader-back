import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async (id) => {
  const chapters = await prisma.chapter.findMany({
    where: { mangaId: id },
  });
  for (const chapter of chapters) {
    const chapterReadDeleted = await prisma.chapterRead.deleteMany({
      where: { chapterId: chapter.id },
    });
    if (chapterReadDeleted.count) {
      console.log(`Deleted chapterRead: ${chapter.name}`);
    }
    const deletedPages = await prisma.page.deleteMany({
      where: { chapterId: chapter.id },
    });
    await prisma.chapter.delete({ where: { id: chapter.id } });
    console.log(
      `Deleted chapter: ${chapter.name} with ${deletedPages.count} pages`,
    );
  }
  const deletedManga = await prisma.manga.delete({ where: { id } });
  console.log(`Deleted manga: ${deletedManga.name}`);
};

export default (id) => {
  main(id)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
