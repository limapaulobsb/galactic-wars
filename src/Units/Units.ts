import { Count, Damage, Unit, UnitGroup } from '../Types';
import { hitPercentage } from '../utils';

abstract class Units implements UnitGroup {
  private _destroyed = 0;
  private _neutralized = 0;
  private _excessDamage = 0;

  constructor(private _data: Unit, private _count: number) {}

  get data(): Unit {
    return this._data;
  }

  get count(): Count {
    return {
      available: this._count,
      affected: this._destroyed + this._neutralized,
      destroyed: this._destroyed,
      neutralized: this._neutralized,
    };
  }

  get damage(): Damage {
    const {
      damageType: type,
      firePower,
      fireRate,
      quantityOfWeapons,
      weaponsSpeed: speed,
      initiative: priority,
    } = this._data;
    const output = firePower * fireRate * quantityOfWeapons * this._count;
    return { type, output, speed, priority };
  }

  get fuselage(): number {
    return this._data.fuselage * this._count;
  }

  addUnits(count: number): void {
    this._count += count;
  }

  removeUnits(count: number): void {
    this._count = this._count > count ? this._count - count : 0;
  }

  receiveDamage({ type, output, speed }: Damage): void {
    if (this.fuselage > 0) {
      // Damage correction
      console.log(output);
      console.log(hitPercentage(speed, this._data.agility));
      
      let damage = output * hitPercentage(speed, this._data.agility);
      if (type === 'EMP') {
        damage /= 1 + this._data.empResistance / 100;
      } else {
        damage += this._excessDamage;
      }
      if (damage > this.fuselage) {
        damage = this.fuselage;
      }
      console.log(damage);
      
      // Update group count
      const affected = Math.trunc(damage / this._data.fuselage);
      this._count -= affected;
      if (type === 'EMP') {
        this._neutralized += affected;
      } else {
        this._destroyed += affected;
        this._excessDamage = damage % this._data.fuselage;
      }
    }
  }
}

export default Units;
