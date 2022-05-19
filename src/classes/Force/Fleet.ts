import Forces from './Force';
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

  addUnits(name: string, count: number): void {
    const index = this._groups.findIndex(({ data }) => data.name === name);
    if (index !== -1) this._groups[index].addUnits(count);
    else this._groups.push(new Ships(name, count));
  }
}

export default Fleet;
