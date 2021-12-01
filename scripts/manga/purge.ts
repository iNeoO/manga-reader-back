import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.chapterRead.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.chapter.deleteMany({});
  await prisma.manga.deleteMany({});
  await prisma.user.deleteMany({});
}

export default () => {
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
