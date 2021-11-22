import { PrismaClient } from '@prisma/client';
import { readdir } from 'fs/promises';

const prisma = new PrismaClient();

async function main(name: string, path: string) {
  const manga = await prisma.manga.create({
    data: { name },
    select: { id: true },
  });

  const chapters = await readdir(path);
  const directoryName = path.split('/').pop();
  for (const [chapterIndex, chapterName] of chapters.entries()) {
    const chapter = await prisma.chapter.create({
      data: { name: chapterName, mangaId: manga.id, number: chapterIndex + 1 },
      select: { id: true },
    });
    const pages = await readdir(`${path}/${chapterName}`);
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
        if (chapterIndex === 0) {
          await prisma.manga.update({
            where: { id: manga.id },
            data: { coverPageId: pageCreated.id },
          });
        }
        await prisma.chapter.update({
          where: { id: chapter.id },
          data: { coverPageId: pageCreated.id },
        });
      }
    }
  }
}

export default (name: string, path: string) => {
  main(name, path)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}