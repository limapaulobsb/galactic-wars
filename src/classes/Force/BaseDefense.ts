import Force from './Force';
import { Defenses } from '../Units';

class BaseDefense extends Force {
  constructor(groups: Defenses[] = []) {
    for (const group of groups) {
      if (!(group instanceof Defenses)) {
        throw new Error('Invalid array for class constructor');
      }
    }
    super(groups);
  }

  public addUnits(name: string, count: number): void {
    const index = this._groups.findIndex(({ data }) => data.name === name);
    if (index !== -1) {
      this._groups[index].addUnits(count);
    } else {
      this._groups.push(new Defenses(name, count));
    }
  }
}

export default BaseDefense;
