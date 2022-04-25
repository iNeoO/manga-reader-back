import { PrismaClient } from '@prisma/client';
import { readdir, lstat } from 'fs/promises';

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
  addPages(
    path,
    `${directoryName}/${chapterName}`,
    pages,
    manga.id,
    chapter.id,
    chapterIndex,
  );
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

const addPages = async (
  globalPath: string,
  path: string,
  pages: string[],
  mangaId: string,
  chapterId: string,
  chapterIndex: number,
) => {
  let index = 0;
  for (const [pageIndex, pageName] of pages.entries()) {
    let pageCreated;
    const file = await lstat(`${globalPath}/${pageName}`);
    if (file.isFile()) {
      pageCreated = await prisma.page.create({
        data: {
          name: pageName,
          path: `${path}/${pageName}`,
          number: pageIndex + 1,
          chapterId: chapterId,
        },
      });
    } else {
      const pageOrdered = (await readdir(`${globalPath}/${pageName}`)).sort(
        (a: string, b: string) =>
          Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]),
      );
      for (const [subPageIndex, subPageName] of pageOrdered.entries()) {
        pageCreated = await prisma.page.create({
          data: {
            name: `${pageName}-${subPageName}`,
            path: `${path}/${pageName}/${subPageName}`,
            number: index + 1,
            chapterId: chapterId,
          },
        });
        index += 1;
      }
    }
    if (pageIndex === 0) {
      if (chapterIndex === 0) {
        await prisma.manga.update({
          where: { id: mangaId },
          data: { coverPageId: pageCreated.id },
        });
      }
      await prisma.chapter.update({
        where: { id: chapterId },
        data: { coverPageId: pageCreated.id },
      });
    }
  }
};
