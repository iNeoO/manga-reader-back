import { ChapterRead as ChapterReadModel } from '@prisma/client';

export type CreateChapterRead = {
  chapterId: string;
  lastPageReadId: string;
  isRead: boolean;
};

export type DeleteChapterRead = {
  chapterId: string;
  userId: string;
};

export type ChapterReadWithOnlyData = Omit<
  ChapterReadModel,
  'chapterId' | 'userId'
>;

export type ChapterReadFormated = Omit<
  ChapterReadWithOnlyData,
  'lastPageReadId'
> & {
  page: {
    id: string;
    name: string;
    number: number;
  };
  chapter: {
    id: string;
    name: string;
    number: number;
    nbPages: number;
  };
  manga: {
    id: string;
    name: string;
  };
};
