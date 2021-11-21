import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterFormated } from './type/chapter.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chapters')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<ChapterFormated> {
    return this.chapterService.getChapter(req.user.userId, { id });
  }
}
