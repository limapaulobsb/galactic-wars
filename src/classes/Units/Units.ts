import { Count, Damage, Group, Unit } from '../../types';
import { hitPercentage } from '../../utils';

abstract class Units implements Group {
  private _destroyed = 0;
  private _neutralized = 0;
  private _excessDamage = 0;

  constructor(private _data: Unit, protected _count: number) {}

  public get data() {
    return { ...this._data };
  }

  public get count(): Count {
    return {
      available: this._count,
      affected: this._destroyed + this._neutralized,
      destroyed: this._destroyed,
      neutralized: this._neutralized,
    };
  }

  public get damage(): Damage {
    const {
      damageType: type,
      firePower,
      fireRate,
      quantityOfWeapons,
      weaponsSpeed,
      initiative: priority,
    } = this.data;
    const output = firePower * fireRate * quantityOfWeapons * this._count;
    return { type, output, weaponsSpeed, priority };
  }

  public get fuselage(): number {
    return this.data.fuselage * this._count;
  }

  public addUnits(count: number): void {
    this._count += count;
  }

  public removeUnits(count: number): void {
    this._count = this._count > count ? this._count - count : 0;
  }

  protected applyDamage({ type, output, weaponsSpeed }: Damage): number {
    // Damage correction
    let damage = output * hitPercentage(weaponsSpeed, this.data.agility || 0);
    if (type === 'EMP') {
      damage /= 1 + this.data.empResistance / 100;
    } else {
      damage += this._excessDamage;
    }
    if (damage > this.fuselage) {
      damage = this.fuselage;
    }
    // Update group count
    const affected = Math.trunc(damage / this.data.fuselage);
    this._count -= affected;
    if (type === 'EMP') {
      this._neutralized += affected;
    } else {
      this._destroyed += affected;
      this._excessDamage = damage % this.data.fuselage;
    }
    return affected;
  }

  public receiveDamage(damage: Damage): void {
    this.applyDamage(damage);
  }
}

export default Units;
