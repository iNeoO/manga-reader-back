import { Module } from '@nestjs/common';
import { ChapterReadController } from './chapterRead.controller';
import { ChapterReadService } from './chapterRead.service';
import { ChapterModule } from '../chapter/chapter.module';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [ChapterModule],
  controllers: [ChapterReadController],
  providers: [ChapterReadService, PrismaService],
})
export class ChapterReadModule {}
