import Units from './Units';
import { unitData } from '../../data';

class Fighters extends Units {
  constructor(name: string, count: number) {
    const data = unitData.find((unit) => unit.name === name && !unit.type);
    if (!data) throw new Error('Invalid fighter name for class constructor');
    super(data, count);
  }
}

export default Fighters;
