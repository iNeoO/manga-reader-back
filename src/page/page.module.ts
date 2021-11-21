import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [PageController],
  providers: [PageService, PrismaService],
})
export class PageModule {}
