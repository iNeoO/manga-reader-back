import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async (id) => {
  const chapterReadDeleted = await prisma.chapterRead.deleteMany({
    where: { chapterId: id },
  });
  if (chapterReadDeleted.count) {
    console.log('Deleted chapterRead');
  }
  const deletedPages = await prisma.page.deleteMany({
    where: { chapterId: id },
  });
  await prisma.chapter.delete({ where: { id: id } });
  console.log(`Deleted chapter with ${deletedPages.count} pages`);
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
