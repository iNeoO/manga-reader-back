import { PrismaClient } from '@prisma/client';

export default async (id) => {
  const prisma = new PrismaClient();
  async function main() {
    const manga = await prisma.chapter.findMany({
      where: { mangaId: id },
      include: {
        _count: {
          select: {
            pages: true,
          },
        },
      },
    });
    console.table(manga);
  }

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
