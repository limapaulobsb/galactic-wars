import shipData from './shipData';
import { Rank, Ship, ShipGroup } from '../Types';

class Ships implements ShipGroup {
  private _data: Ship;
  private _destroyed = 0;
  private _neutralized = 0;
  // private _excessDamage = 0;

  constructor(name: string, private _count: number) {
    const data = shipData.find((ship) => ship.name === name);
    if (!data) throw new Error('Invalid ship name for class constructor');
    this._data = data;
  }

  get data(): Ship {
    return this._data;
  }

  get name(): string {
    return this._data.name;
  }

  get rank(): string {
    return Rank[this._data.rank];
  }

  get initiative(): number {
    return this._data.initiative;
  }

  get fuselage(): number {
    return this._data.fuselage * this._count;
  }

  get agility(): number {
    return this._data.agility;
  }

  get damageOutput(): number {
    const { firePower, fireRate, quantityOfWeapons } = this._data;
    return firePower * fireRate * quantityOfWeapons * this._count;
  }

  get weaponsSpeed(): number {
    return this._data.weaponsSpeed;
  }

  get damageType(): string {
    return this._data.damageType;
  }

  get empResistance(): number {
    return this._data.empResistance;
  }

  get count(): number {
    return this._count;
  }

  get affected(): number {
    return this._destroyed + this._neutralized;
  }

  get destroyed(): number {
    return this._destroyed;
  }

  get neutralized(): number {
    return this._neutralized;
  }
}

export default Ships;
