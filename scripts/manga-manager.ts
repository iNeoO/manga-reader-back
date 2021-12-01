import add from './manga/add';
import purge from './manga/purge';
import createuser from './manga/createuser';
import serialize from './manga/serialize';
import deleteManga from './manga/delete';

const [, , commands, ...params] = process.argv;

switch (commands) {
  case 'add':
    const [name, path] = params;
    if (!name || !path) {
      console.log('help');
      break;
    }
    add(name, path);
    break;
  case 'createuser':
    createuser();
    break;
  case 'purge':
    purge();
    break;
  case 'serialize':
    serialize(name, path);
    break;
  case 'delete':
    deleteManga();
    break;
  default:
    console.log('help');
    break;
}
