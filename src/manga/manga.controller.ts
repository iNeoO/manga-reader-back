import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { MangaService } from './manga.service';
import { Manga as MangaModel } from '@prisma/client';
import { MangaWithChapters } from './type/manga.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('mangas')
export class MangaController {
  constructor(private mangaService: MangaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  find(): Promise<MangaModel[]> {
    return this.mangaService.getMangas();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<MangaWithChapters> {
    return this.mangaService.getManga({ id }, req.user.userId);
  }
}
