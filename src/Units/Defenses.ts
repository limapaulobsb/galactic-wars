import Units from './Units';
import defenseData from '../data/defenseData';

class Defenses extends Units {
  constructor(name: string, count: number) {
    const data = defenseData.find((defense) => defense.name === name);
    if (!data) throw new Error('Invalid defense name for class constructor');
    super(data, count);
  }
}

export default Defenses;
