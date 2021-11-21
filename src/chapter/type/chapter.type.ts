import { Chapter as ChapterModel } from '@prisma/client';
import { PageIsRead } from '../../page/type/page.type';
import { ChapterReadWithOnlyData } from '../../chapterRead/type/chapterRead.type';

export type ChapterWithoutMangaId = Omit<ChapterModel, 'mangaId'>;

export type ChapterWithPages = ChapterWithoutMangaId & {
  pages: PageIsRead[];
};

export type ChapterWithIsRead = ChapterWithoutMangaId & {
  chaptersRead: ChapterReadWithOnlyData[];
};

export type ChapterFormated = ChapterWithoutMangaId & {
  isRead: boolean;
  lastPageReadId: string;
};
