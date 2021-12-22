import addManga from './manga/addManga';
import addChapter from './manga/addChapter';
import deleteManga from './manga/deleteManga';
import deleteChapter from './manga/deleteChapter';
import purge from './manga/purge';
import createUser from './manga/createUser';
import serialize from './manga/serialize';
import listMangas from './manga/list';
import infoManga from './manga/info';

const [, , commands, ...params] = process.argv;

switch (commands) {
  case 'createuser':
    createUser();
    break;
  case 'serialize':
    (() => {
      const [path] = params;
      if (!path) {
        console.log('help');
        return;
      }
      serialize(path);
      return;
    })();
    break;
  case 'add':
    (() => {
      const [name, path] = params;
      if (!name || !path) {
        console.log('help');
        return;
      }
      addManga(name, path);
      return;
    })();
    break;
  case 'addchapter':
    (() => {
      const [id, path] = params;
      if (!id || !path) {
        console.log('help');
        return;
      }
      addChapter(id, path);
      return;
    })();
    break;
  case 'delete':
    const [deleteMangaId] = params;
    deleteManga(deleteMangaId);
    break;
  case 'deletechapter':
    const [deleteCbapterId] = params;
    deleteChapter(deleteCbapterId);
    break;
  case 'list':
    listMangas();
    break;
  case 'info':
    const [infoMangaId] = params;
    infoManga(infoMangaId);
    break;
  case 'purge':
    purge();
    break;
  default:
    console.log('help');
    break;
}
