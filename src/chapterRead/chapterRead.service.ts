import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ChapterRead } from '@prisma/client';
import { throwError } from 'rxjs';

@Injectable()
export class ChapterReadService {
  constructor(private prisma: PrismaService) {}

  async postChapterRead(
    chapterId: string,
    lastPageReadId: string,
    userId: string,
    isRead: boolean,
  ): Promise<ChapterRead> {
    try {
      const chapterRead = await this.prisma.chapterRead.create({
        data: {
          isRead,
          userId,
          chapterId,
          lastPageReadId,
        },
      });
      return chapterRead;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return this.prisma.chapterRead.findFirst({
          where: {
            chapterId,
            userId,
          },
        });
      }
      throw error;
    }
  }
  async deleteChapterRead(
    chapterId: string,
    userId: string,
  ): Promise<{ count: number }> {
    try {
      const result = await this.prisma.chapterRead.deleteMany({
        where: {
          chapterId,
          userId,
        },
      });
      return result;
    } catch (error) {
      throw new NotFoundException('ChapterRead not found.');
    }
  }
}
