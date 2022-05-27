import { BaseDefense } from '../Force';
import { Base, Roids } from '../../types';

class Galaxy implements Base {
  constructor(
    private _roids: Roids = [0, 0, 0],
    readonly defense: BaseDefense = new BaseDefense()
  ) {}

  public get roids(): Roids {
    return this._roids;
  }

  public set roids(roids: Roids) {
    this._roids = [...roids];
  }
}

export default Galaxy;
