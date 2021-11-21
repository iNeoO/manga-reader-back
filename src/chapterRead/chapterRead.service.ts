import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ChapterRead } from '@prisma/client';

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
      console.log(error);
      return this.prisma.chapterRead.findFirst({
        where: {
          chapterId,
          userId,
        },
      });
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
