import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { ChapterFormated } from './type/chapter.type';
import { PageWithoutPath, PageIsRead } from '../page/type/page.type';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  async getChapter(
    userId: string,
    chapterWhereUniqueInput: Prisma.ChapterWhereUniqueInput,
  ): Promise<ChapterFormated> {
    const chapter = await this.prisma.chapter.findUnique({
      where: chapterWhereUniqueInput,
      select: {
        id: true,
        name: true,
        coverPageId: true,
        chaptersRead: {
          where: {
            userId,
          },
          select: {
            isRead: true,
            lastPageReadId: true,
          },
        },
        pages: {
          select: {
            id: true,
            name: true,
            numero: true,
          },
          orderBy: {
            numero: 'asc',
          },
        },
      },
    });
    if (!chapter) {
      throw new NotFoundException('Chapter not found.');
    }

    let lastPageFind = !chapter.chaptersRead[0];

    const chapterFormated = {
      id: chapter.id,
      name: chapter.name,
      coverPageId: chapter.coverPageId,
      isRead: chapter.chaptersRead[0]?.isRead || false,
      lastPageReadId: chapter.chaptersRead[0]?.lastPageReadId || null,
      pages: chapter.pages.map((page: PageWithoutPath) => {
        const isRead = !lastPageFind;
        if (
          !lastPageFind &&
          page.id === chapter.chaptersRead[0]?.lastPageReadId
        ) {
          lastPageFind = true;
        }
        const pageFormated: PageIsRead = {
          ...page,
          isRead,
        };
        return pageFormated;
      }),
    };

    return chapterFormated;
  }
}
