import { Page as PageModel } from '@prisma/client';

export type PageWithoutPath = Omit<PageModel, 'path' | 'chapterId'>;

export type PageIsRead = PageWithoutPath & { isRead: boolean };
