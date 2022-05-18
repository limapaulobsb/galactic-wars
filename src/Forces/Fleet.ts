import Forces from './Forces';
import { Ships } from '../Units';

class Fleet extends Forces {
  constructor(groups: Ships[]) {
    for (const group of groups) {
      if (!(group instanceof Ships)) {
        throw new Error('Invalid array for class constructor');
      }
    }
    super(groups);
  }
}

export default Fleet;
