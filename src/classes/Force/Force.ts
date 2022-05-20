import { Damage, GroupInfo, SuperGroup } from '../../types';
import Units from '../Units';
import { ceil, round } from '../../utils';

abstract class Forces implements SuperGroup {
  constructor(protected _groups: Units[]) {}

  get groups(): GroupInfo[] {
    return this._groups.map(({ data: { name }, count }) => ({ name, count }));
  }

  get damage(): Damage[] {
    return this._groups.map((group) => group.damage);
  }

  get fuselage(): number {
    return this._groups.reduce((acc, curr) => acc + curr.fuselage, 0);
  }

  abstract addUnits(name: string, count: number): void;

  removeUnits(name: string, count: number): void {
    const index = this._groups.findIndex(({ data }) => data.name === name);
    if (index !== -1) this._groups[index].removeUnits(count);
  }

  receiveDamage({ type, output, speed, priority }: Damage): void {
    // Calculates the weight of each group and passes the damage along
    const initialFuselage = this.fuselage;
    for (const group of this._groups) {
      const weight = ceil(group.fuselage / initialFuselage , 3);
      const damage = {
        type,
        output: round(output * weight, 0),
        speed,
        priority,
      };
      group.receiveDamage(damage);
    }
  }
}

export default Forces;
