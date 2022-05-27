import Units from './Units';
import { Damage, Roids } from '../../types';
import { ceil, randomInt, referenceValues, round } from '../../utils';
import shipData from '../../data/shipData';

class Extractors extends Units {
  private _roids: Roids = [0, 0, 0];
  readonly storageCapacity: number;

  constructor(name: string, count: number) {
    const data = shipData.find((ship) => ship.name === name && ship.type === 'Extractor');
    if (!data) throw new Error('Invalid extractor name for class constructor');
    super(data, count);
    this.storageCapacity = data.storageCapacity || 0;
  }

  public get roids(): Roids {
    return [...this._roids];
  }

  public get capacity(): number {
    const totalCapacity = this.storageCapacity * this._count;
    return totalCapacity - this._roids[0] - this._roids[1] - this._roids[2];
  }

  private loseRandomRoids(amount: number): void {
    let i = 0;
    while (this._roids[0] + this._roids[1] + this._roids[2] > 0 && i < amount) {
      const pool = [];
      if (this._roids[0] > 0) pool.push(0);
      if (this._roids[1] > 0) pool.push(1);
      if (this._roids[2] > 0) pool.push(2);
      const randomIndex = pool[randomInt(0, pool.length - 1)];
      this._roids[randomIndex] -= 1;
      i += 1;
    }
  }

  public receiveDamage(damage: Damage): void {
    const affected = this.applyDamage(damage);
    this.loseRandomRoids(affected * this.storageCapacity);
  }

  public extract([metalium, carbonum, plutonium]: Roids): Roids {
    const attempts = this._count < this.capacity ? this._count : this.capacity;
    let attemptsMetalium: number, attemptsCarbonum: number, attemptsPlutonium: number;

    if (metalium + carbonum + plutonium <= attempts) {
      attemptsMetalium = metalium;
      attemptsCarbonum = carbonum;
      attemptsPlutonium = plutonium;
    } else {
      const metaliumWeight = metalium / (metalium + carbonum + plutonium);
      const carbonumWeight = carbonum / (carbonum + plutonium);
      attemptsMetalium = ceil(attempts * metaliumWeight);
      attemptsCarbonum = ceil((attempts - attemptsMetalium) * carbonumWeight);
      attemptsPlutonium = attempts - attemptsMetalium - attemptsCarbonum;
    }

    const minCarbonum = round(attemptsCarbonum / referenceValues.CAR_MUL);
    const minPlutonium = round(attemptsPlutonium / referenceValues.PLU_MUL);
    const extractedMetalium = attemptsMetalium;
    const extractedCarbonum = randomInt(minCarbonum, attemptsCarbonum);
    const extractedPlutonium = randomInt(minPlutonium, attemptsPlutonium);

    this._roids[0] += extractedMetalium;
    this._roids[1] += extractedCarbonum;
    this._roids[2] += extractedPlutonium;

    return [extractedMetalium, extractedCarbonum, extractedPlutonium];
  }
}

export default Extractors;
