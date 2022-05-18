import { Count, Damage, ShipGroup } from '../Types';
import { Ships } from '../Units';

class Fleet implements ShipGroup {
  constructor(private _fleet: Ships[]) {
    for (const ships of _fleet) {
      if (!(ships instanceof Ships)) {
        throw new Error('Invalid class');
      }
    }
  }

  get ships(): [string, Count][] {
    return this._fleet.map((ships) => [ships.data.name, ships.count]);
  }

  get damage(): Damage[] {
    return this._fleet.map((ships) => ships.damage);
  }

  get fuselage(): number {
    return this._fleet.reduce((acc, curr) => acc + curr.fuselage, 0);
  }

  addShips(name: string, count: number): void {
    const index = this._fleet.findIndex(({ data }) => data.name === name);
    if (index !== -1) this._fleet[index].addUnits(count);
    else this._fleet.push(new Ships(name, count));
  }

  removeShips(name: string, count: number): void {
    const index = this._fleet.findIndex(({ data }) => data.name === name);
    if (index !== -1) this._fleet[index].removeUnits(count);
  }

  receiveDamage({ type, output, speed }: Damage): void {
    // Calculates the weight of each group and passes the damage along
    const initialFuselage = this.fuselage;
    for (const ships of this._fleet) {
      const weight = ships.fuselage / initialFuselage;
      const damage = {
        type,
        output: Math.round(output * weight),
        speed,
      };
      ships.receiveDamage(damage);
    }
  }
}

export default Fleet;
