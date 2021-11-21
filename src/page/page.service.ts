import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Page } from '@prisma/client';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  async getPage(
    pageWhereUniqueInput: Prisma.PageWhereUniqueInput,
  ): Promise<Page> {
    const page = await this.prisma.page.findUnique({
      where: pageWhereUniqueInput,
    });

    if (!page) {
      throw new NotFoundException('Page not found.');
    }
    return page;
  }
}
