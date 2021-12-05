import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ChapterRead } from '@prisma/client';

import { ChapterReadFormated } from './type/chapterRead.type';

@Injectable()
export class ChapterReadService {
  constructor(private prisma: PrismaService) {}

  async getAllChaptersRead(userId: string): Promise<ChapterReadFormated[]> {
    const chaptersRead = await this.prisma.chapterRead.findMany({
      where: {
        userId,
      },
      select: {
        isRead: true,
        createdAt: true,
        updatedAt: true,
        page: {
          select: {
            name: true,
            number: true,
            id: true,
          },
        },
        chapter: {
          include: {
            manga: {
              select: {
                id: true,
                name: true,
              },
            },
            _count: {
              select: {
                pages: true,
              },
            },
          },
        },
      },
    });
    return chaptersRead.map((chapterRead) => ({
      isRead: chapterRead.isRead,
      createdAt: chapterRead.createdAt,
      updatedAt: chapterRead.updatedAt,
      page: chapterRead.page,
      chapter: {
        id: chapterRead.chapter.id,
        name: chapterRead.chapter.name,
        number: chapterRead.chapter.number,
        nbPages: chapterRead.chapter._count.pages,
      },
      manga: {
        id: chapterRead.chapter.manga.id,
        name: chapterRead.chapter.manga.name,
      },
    }));
  }

  async postChapterRead(
    chapterId: string,
    lastPageReadId: string,
    userId: string,
    isRead: boolean,
  ): Promise<ChapterRead> {
    try {
      const chapterRead = await this.prisma.chapterRead.upsert({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          },
        },
        update: {
          isRead,
          chapterId,
          lastPageReadId,
        },
        create: {
          isRead,
          userId,
          chapterId,
          lastPageReadId,
        },
      });
      return chapterRead;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return this.prisma.chapterRead.findUnique({
          where: {
            userId_chapterId: {
              userId,
              chapterId,
            },
          },
        });
      }
      throw error;
    }
  }
  async deleteChapterRead(
    chapterId: string,
    userId: string,
  ): Promise<ChapterRead> {
    try {
      const result = await this.prisma.chapterRead.delete({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          },
        },
      });
      return result;
    } catch (error) {
      throw new NotFoundException('ChapterRead not found.');
    }
  }
}
