import { readdir, rename } from 'fs/promises';

export default async (name: string, path: string) => {
  const chapters = await readdir(path);

  for (const [chapterIndex, chapterName] of chapters.entries()) {
    await rename(`${path}/${chapterName}`, `${path}/${chapterIndex + 1}`);

    const pages = await readdir(`${path}/${chapterIndex + 1}`);
    for (const [pageIndex, pageName] of pages.entries()) {
      const extension = pageName.split('.').pop();
      await rename(
        `${path}/${chapterIndex + 1}/${pageName}`,
        `${path}/${chapterIndex + 1}/${pageIndex + 1}.${extension}`,
      );
    }
  }
};
