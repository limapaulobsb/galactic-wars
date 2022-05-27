import { v4 as uuidv4 } from 'uuid';
import Units from '../Units';
import { Damage, GroupInfo, SuperGroup } from '../../types';
import { ceil, round } from '../../utils';

abstract class Force implements SuperGroup {
  private _id: string;

  constructor(protected _groups: Units[]) {
    this._id = uuidv4();
  }

  public get id() {
    return this._id;
  }

  public get groups(): GroupInfo[] {
    return this._groups.map(({ data: { name }, count }) => ({ name, count }));
  }

  public get damages(): Damage[] {
    return this._groups.map(({ damage }) => damage);
  }

  public get fuselage(): number {
    return this._groups.reduce((acc, { fuselage }) => acc + fuselage, 0);
  }

  public abstract addUnits(name: string, count: number): void;

  public removeUnits(name: string, count: number): void {
    const index = this._groups.findIndex(({ data }) => data.name === name);
    if (index !== -1) this._groups[index].removeUnits(count);
  }

  public distributeDamages(damage: Damage): void {
    const { type, output, weaponsSpeed, priority } = damage;
    const totalFuselage = this.fuselage;
    // Calculates the weight of each group and passes the damage along
    for (const group of this._groups) {
      if (group.fuselage > 0) {
        const weight = ceil(group.fuselage / totalFuselage, 4);
        group.receiveDamage({
          type,
          output: round(output * weight),
          weaponsSpeed,
          priority,
        });
      }
    }
  }
}

export default Force;
