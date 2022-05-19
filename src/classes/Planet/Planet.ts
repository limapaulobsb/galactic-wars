import { Base, GroupInfo, Roids } from '../../types';
import { BaseDefense } from '../Force';

class Planet implements Base {
  constructor(
    private _defense: BaseDefense = new BaseDefense(),
    private _roids: Roids = { metalium: 0, carbonum: 0, plutonium: 0 }
  ) {}

  get defense(): GroupInfo[] {
    return this._defense.groups;
  }

  get roids(): Roids {
    return this._roids;
  }
}

export default Planet;
