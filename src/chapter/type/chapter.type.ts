import { Chapter as ChapterModel } from '@prisma/client';
import { PageIsRead } from '../../page/type/page.type';
import { ChapterReadWithOnlyData } from '../../chapterRead/type/chapterRead.type';

export type ChapterWithoutMangaId = Omit<ChapterModel, 'mangaId'>;

export type ChapterWithPages = ChapterWithoutMangaId & {
  pages: PageIsRead[];
};

export type ChapterWithIsRead = ChapterWithoutMangaId & {
  _count?: { pages: number };
  chaptersRead: ChapterReadWithOnlyData[];
  pages?: { id: string }[];
};

export type ChapterFormated = ChapterWithoutMangaId & {
  isRead: boolean;
  lastPageReadId: string;
  count?: number;
  countPagesRead?: number;
};
