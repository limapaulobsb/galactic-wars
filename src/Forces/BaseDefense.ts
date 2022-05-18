import Forces from './Forces';
import { Defenses } from '../Units';

class BaseDefense extends Forces {
  constructor(groups: Defenses[]) {
    for (const group of groups) {
      if (!(group instanceof Defenses)) {
        throw new Error('Invalid array for class constructor');
      }
    }
    super(groups);
  }
}

export default BaseDefense;
