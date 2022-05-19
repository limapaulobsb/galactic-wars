import Units from '../Units';
import { Count, Damage, SuperGroup } from '../Types';

abstract class Forces implements SuperGroup {
  constructor(protected _groups: Units[]) {}

  get groups(): [string, Count][] {
    return this._groups.map((group) => [group.data.name, group.count]);
  }

  get damage(): Damage[] {
    return this._groups.map((group) => group.damage);
  }

  get fuselage(): number {
    return this._groups.reduce((acc, curr) => acc + curr.fuselage, 0);
  }

  abstract addShips(name: string, count: number): void;

  removeShips(name: string, count: number): void {
    const index = this._groups.findIndex(({ data }) => data.name === name);
    if (index !== -1) this._groups[index].removeUnits(count);
  }

  receiveDamage({ type, output, speed }: Damage): void {
    // Calculates the weight of each group and passes the damage along
    const initialFuselage = this.fuselage;
    for (const group of this._groups) {
      const weight = group.fuselage / initialFuselage;
      const damage = {
        type,
        output: Math.round(output * weight),
        speed,
      };
      group.receiveDamage(damage);
    }
  }
}

export default Forces;
