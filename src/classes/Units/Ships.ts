import Units from './Units';
import shipData from '../../data/shipData';

class Ships extends Units {
  constructor(name: string, count: number) {
    const data = shipData.find((ship) => ship.name === name);
    if (!data) throw new Error('Invalid ship name for class constructor');
    super(data, count);
  }
}

export default Ships;
