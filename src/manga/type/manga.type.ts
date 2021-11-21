import { Manga as MangaModel } from '@prisma/client';
import { ChapterFormated } from '../../chapter/type/chapter.type';

export type MangaWithChapters = MangaModel & {
  chapters: ChapterFormated[];
};
