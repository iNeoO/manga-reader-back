import add from './manga/add';
import purge from './manga/purge';
import createuser from './manga/createuser';
import serialize from './manga/serialize';
import deleteManga from './manga/delete';
import listMangas from './manga/list';
import infoManga from './manga/info';

const [, , commands, ...params] = process.argv;

switch (commands) {
  case 'add':
    (() => {
      const [name, path] = params;
      if (!name || !path) {
        console.log('help');
        return;
      }
      add(name, path);
      return;
    })();
    break;
  case 'info':
    const [infoMangaId] = params;
    infoManga(infoMangaId);
    break;
  case 'list':
    listMangas();
    break;
  case 'createuser':
    createuser();
    break;
  case 'purge':
    purge();
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
  case 'delete':
    const [deleteMangaId] = params;
    deleteManga(deleteMangaId);
    break;
  default:
    console.log('help');
    break;
}
