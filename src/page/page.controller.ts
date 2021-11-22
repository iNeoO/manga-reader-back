import {
  Controller,
  Get,
  Param,
  StreamableFile,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import * as sharp from 'sharp';
import { join } from 'path';
import { PageService } from './page.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pages')
export class PageController {
  constructor(private pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StreamableFile> {
    const page = await this.pageService.getPage({ id });
    try {
      const file = createReadStream(join(process.env.CDN_PATH, page.path));
      return new StreamableFile(file);
    } catch (error) {
      throw new NotFoundException('Image not found.');
    }
  }

  @Get(':id/minified')
  async findOneMinified(@Param('id') id: string): Promise<StreamableFile> {
    const page = await this.pageService.getPage({ id });
    try {
      const file = await sharp(join(process.env.CDN_PATH, page.path))
        .resize(200)
        .png()
        .toBuffer();
      return new StreamableFile(file);
    } catch (error) {
      throw new NotFoundException('Image not found.');
    }
  }
}
