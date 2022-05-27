import Units from './Units';
import { unitData } from '../../data';

class Defenses extends Units {
  constructor(name: string, count: number) {
    const data = unitData.find((unit) => unit.name === name && unit.type === 'Defense');
    if (!data) throw new Error('Invalid defense name for class constructor');
    super(data, count);
  }
}

export default Defenses;
