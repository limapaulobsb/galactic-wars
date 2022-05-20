import { Base, Roids, SuperGroup } from '../../types';
import { BaseDefense } from '../Force';

class Galaxy implements Base {
  constructor(
    private _defense: BaseDefense = new BaseDefense(),
    private _roids: Roids = { metalium: 0, carbonum: 0, plutonium: 0 }
  ) {}

  get defense(): SuperGroup {
    return this._defense;
  }

  get roids(): Roids {
    return this._roids;
  }
}

export default Galaxy;
