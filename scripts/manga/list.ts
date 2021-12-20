import { PrismaClient } from '@prisma/client';

export default async () => {
  const prisma = new PrismaClient();
  async function main() {
    const mangas = await prisma.manga.findMany({
      include: {
        _count: {
          select: {
            chapters: true,
          },
        },
      },
    });
    console.table(mangas);
  }

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
