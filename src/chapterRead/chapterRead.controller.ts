import {
  Controller,
  Post,
  Body,
  Delete,
  Request,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ChapterReadService } from './chapterRead.service';
import { CreateChapterReadDto } from './dto/create-chapterRead.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChapterService } from '../chapter/chapter.service';
import { ChapterFormated } from '../chapter/type/chapter.type';

import { ChapterReadFormated } from './type/chapterRead.type';
import { ChapterRead } from '@prisma/client';

@Controller('chapters-read')
export class ChapterReadController {
  constructor(
    private chapterReadService: ChapterReadService,
    private chapterService: ChapterService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req): Promise<ChapterReadFormated[]> {
    return this.chapterReadService.getAllChaptersRead(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createChapterReadDto: CreateChapterReadDto,
  ): Promise<ChapterFormated> {
    await this.chapterReadService.postChapterRead(
      createChapterReadDto.chapterId,
      createChapterReadDto.lastPageReadId,
      req.user.userId,
      createChapterReadDto.isRead,
    );

    return this.chapterService.getChapter(req.user.userId, {
      id: createChapterReadDto.chapterId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Request() req,
    @Param('id') chapterId: string,
  ): Promise<ChapterRead> {
    return await this.chapterReadService.deleteChapterRead(
      chapterId,
      req.user.userId,
    );
  }
}
