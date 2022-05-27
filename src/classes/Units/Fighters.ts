import Units from './Units';
import { Damage } from '../../types';
import shipData from '../../data/shipData';

class Fighters extends Units {
  constructor(name: string, count: number) {
    const data = shipData.find((ship) => ship.name === name && !ship.type);
    if (!data) throw new Error('Invalid fighter name for class constructor');
    super(data, count);
  }

  public receiveDamage(damage: Damage): void {
    this.applyDamage(damage);
  }
}

export default Fighters;
