import add from './manga/add';
import purge from './manga/purge';
import createuser from './manga/createuser';

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
  default:
    console.log('help');
    break;
}
