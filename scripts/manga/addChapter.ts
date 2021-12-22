import { PrismaClient } from '@prisma/client';
import { readdir } from 'fs/promises';

const prisma = new PrismaClient();

const main = async (id: string, path: string) => {
  const manga = await prisma.manga.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          chapters: true,
        },
      },
    },
  });
  const chapterIndex = manga._count.chapters;
  const [chapterName, directoryName] = path.split('/').reverse();
  const chapter = await prisma.chapter.create({
    data: { name: chapterName, mangaId: id, number: chapterIndex + 1 },
    select: { id: true },
  });
  const pages = (await readdir(path)).sort(
    (a: string, b: string) =>
      Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]),
  );
  for (const [pageIndex, pageName] of pages.entries()) {
    const pageCreated = await prisma.page.create({
      data: {
        name: pageName,
        path: `${directoryName}/${chapterName}/${pageName}`,
        number: pageIndex + 1,
        chapterId: chapter.id,
      },
    });
    if (pageIndex === 0) {
      await prisma.chapter.update({
        where: { id: chapter.id },
        data: { coverPageId: pageCreated.id },
      });
    }
  }
  console.log(`chapter: ${chapterName}, nb: ${chapterIndex + 1} added!`);
};

export default (id: string, path: string) => {
  main(id, path)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
