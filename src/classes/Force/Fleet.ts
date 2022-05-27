import Force from './Force';
import Units, { Defenses, Extractors, Fighters } from '../Units';
import { Roids } from '../../types';
import { unitData } from '../../data';

class Fleet extends Force {
  constructor(groups: (Fighters | Extractors)[]) {
    for (const group of groups) {
      if (group instanceof Defenses) {
        throw new Error('Invalid array for class constructor');
      }
    }
    super(groups);
  }

  private get extractors(): Extractors[] {
    return this._groups.filter(
      (group) => group instanceof Extractors && group.capacity > 0
    ) as Extractors[];
  }

  public get roids(): Roids {
    return this.extractors.reduce(
      (acc, { roids }) => {
        acc[0] += roids[0];
        acc[1] += roids[1];
        acc[2] += roids[2];
        return acc;
      },
      [0, 0, 0]
    );
  }

  public get capacity(): number {
    return this.extractors.reduce((acc, { capacity }) => acc + capacity, 0);
  }

  public addUnits(name: string, count: number): void {
    const index = this._groups.findIndex(({ data }) => data.name === name);
    if (index !== -1) {
      this._groups[index].addUnits(count);
    } else {
      const data = unitData.find((unit) => unit.name === name);
      let units: Units;
      switch (data?.type) {
        case 'Extractor':
          units = new Extractors(name, count);
          break;
        default:
          units = new Fighters(name, count);
          break;
      }
      this._groups.push(units);
    }
  }

  public extract(roids: Roids): Roids {
    const availableRoids = [...roids] as Roids;
    // Manages available roids and exposes them to extractor groups
    for (const extractor of this.extractors) {
      if (availableRoids[0] + availableRoids[1] + availableRoids[2] > 0) {
        const extractedRoids = extractor.extract(availableRoids);
        availableRoids[0] -= extractedRoids[0];
        availableRoids[1] -= extractedRoids[1];
        availableRoids[2] -= extractedRoids[2];
      }
    }
    return [
      roids[0] - availableRoids[0],
      roids[1] - availableRoids[1],
      roids[2] - availableRoids[2],
    ];
  }
}

export default Fleet;
