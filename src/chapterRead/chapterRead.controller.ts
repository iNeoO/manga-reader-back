import {
  Controller,
  Post,
  Body,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChapterReadService } from './chapterRead.service';
import { CreateChapterReadDto } from './dto/create-chapterRead.dto';
import { DeleteChapterRead } from './type/chapterRead.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChapterService } from '../chapter/chapter.service';
import { ChapterFormated } from '../chapter/type/chapter.type';

@Controller('chapters-read')
export class ChapterReadController {
  constructor(
    private chapterReadService: ChapterReadService,
    private chapterService: ChapterService,
  ) {}

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
  @Delete()
  async delete(
    @Request() req,
    @Body() createChapterRead: DeleteChapterRead,
  ): Promise<ChapterFormated> {
    await this.chapterReadService.deleteChapterRead(
      createChapterRead.chapterId,
      req.user.userId,
    );
    return this.chapterService.getChapter(req.user.userId, {
      id: createChapterRead.chapterId,
    });
  }
}
