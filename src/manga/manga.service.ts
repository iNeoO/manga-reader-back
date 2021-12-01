import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Manga } from '@prisma/client';
import { MangaWithChapters } from './type/manga.type';
import {
  ChapterFormated,
  ChapterWithIsRead,
} from '../chapter/type/chapter.type';

@Injectable()
export class MangaService {
  constructor(private prisma: PrismaService) {}

  async getMangas(): Promise<Manga[]> {
    return await this.prisma.manga.findMany({
      include: {
        _count: {
          select: {
            chapters: true,
          },
        },
      },
    });
  }

  async getManga(
    mangaWhereUniqueInput: Prisma.MangaWhereUniqueInput,
    userId: string,
  ): Promise<MangaWithChapters> {
    const manga = await this.prisma.manga.findUnique({
      where: mangaWhereUniqueInput,
      select: {
        id: true,
        name: true,
        coverPageId: true,
        chapters: {
          include: {
            _count: {
              select: {
                pages: true,
              },
            },
            chaptersRead: {
              where: {
                userId,
              },
              select: {
                isRead: true,
                lastPageReadId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            pages: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            number: 'desc',
          },
        },
      },
    });

    if (!manga) {
      throw new NotFoundException('Manga not found.');
    }

    const countPagesRead = (
      pages: { id: string }[],
      lastPageReadId: string | null,
    ) => {
      if (!lastPageReadId) {
        return 0;
      }

      const lastPageRead = pages.findIndex(
        (page) => page.id === lastPageReadId,
      );
      if (lastPageRead === -1) {
        return 0;
      }

      return lastPageRead + 1;
    };

    const mangaFormated: MangaWithChapters = {
      ...manga,
      chapters: manga.chapters.map((chapter: ChapterWithIsRead) => {
        const chapterFormated: ChapterFormated = {
          id: chapter.id,
          name: chapter.name,
          number: chapter.number,
          count: chapter._count.pages,
          coverPageId: chapter.coverPageId,
          isRead: chapter.chaptersRead[0]?.isRead || false,
          lastPageReadId: chapter.chaptersRead[0]?.lastPageReadId || null,
          countPagesRead: countPagesRead(
            chapter.pages,
            chapter.chaptersRead[0]?.lastPageReadId,
          ),
        };
        return chapterFormated;
      }),
    };

    return mangaFormated;
  }
}
