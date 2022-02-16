import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { createReadStream, ReadStream } from 'fs';
import * as sharp from 'sharp';
import { join } from 'path';
import { PageService } from './page.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pages')
export class PageController {
  constructor(private pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadStream> {
    const page = await this.pageService.getPage({ id });
    try {
      const file = createReadStream(join(process.env.CDN_PATH, page.path));
      return file;
    } catch (error) {
      throw new NotFoundException('Image not found.');
    }
  }

  @Get(':id/minified')
  async findOneMinified(@Param('id') id: string): Promise<Buffer> {
    const page = await this.pageService.getPage({ id });
    try {
      const file = await sharp(join(process.env.CDN_PATH, page.path), {
        failOnError: false,
      })
        .resize(50)
        .png()
        .toBuffer();
      return file;
    } catch (error) {
      throw new NotFoundException('Image not found.');
    }
  }
}
