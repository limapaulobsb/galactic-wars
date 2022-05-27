import Force, { Fleet } from '../Force';
import Galaxy from '../Galaxy';
import { CombatLog, Damage, Encounter, GroupInfo } from '../../types';
import { ceil, floor, referenceValues, round } from '../../utils';

class Combat implements Encounter {
  private _attackingFleets: Fleet[];
  private _defendingForces: Force[];
  private _rounds = 0;
  private _logs: CombatLog[] = [];

  constructor(
    attackingFleets: Fleet[],
    defendingFleets: Fleet[],
    readonly _galaxy: Galaxy = new Galaxy()
  ) {
    this._attackingFleets = [...attackingFleets];
    this._defendingForces = [this._galaxy.defense, ...defendingFleets];
    this.createLog();
  }

  private static getDamages(forces: Force[]): Damage[] {
    return forces.map(({ damages }) => damages).flat();
  }

  private static getFuselage(forces: Force[]): number {
    return forces.reduce((acc, { fuselage }) => acc + fuselage, 0);
  }

  private static assignDamages(damage: Damage, forces: Force[]): void {
    const { type, output, weaponsSpeed, priority } = damage;
    const totalFuselage = Combat.getFuselage(forces);
    // Calculates the weight of each force and passes the damage along
    for (const force of forces) {
      if (force.fuselage > 0) {
        const weight = ceil(force.fuselage / totalFuselage, 4);
        force.distributeDamages({
          type,
          output: round(output * weight),
          weaponsSpeed,
          priority,
        });
      }
    }
  }

  public get attackingGroups(): GroupInfo[][] {
    return this._attackingFleets.map(({ groups }) => groups);
  }

  public get defendingGroups(): GroupInfo[][] {
    return this._defendingForces.map(({ groups }) => groups);
  }

  public get logs(): CombatLog[] {
    return this._logs;
  }

  public joinFleet(fleet: Fleet, side: 'attack' | 'defense'): void {
    if (side === 'attack') this._attackingFleets.push(fleet);
    else this._defendingForces.push(fleet);
  }

  public withdrawFleet(id: string): void {
    let index = this._attackingFleets.findIndex((fleet) => fleet.id === id);
    if (index !== -1) this._attackingFleets.splice(index, 1);
    else {
      index = this._defendingForces.findIndex((fleet) => fleet.id === id);
      if (index !== -1) this._defendingForces.splice(index, 1);
    }
  }

  private executeCombat(): void {
    // The number of combat phases (strikes) is predefined
    // Units with higher initiative attack earlier
    const { MAX_INI, MIN_INI, INI_STP } = referenceValues;
    for (let i = MAX_INI; i > MIN_INI; i -= INI_STP) {
      const attackersDamage = Combat.getDamages(this._attackingFleets);
      const defendersDamage = Combat.getDamages(this._defendingForces);
      // Callback function to filter damage by priority
      const filterCb = ({ priority }: Damage) => {
        // Fix for max priority to be included
        if (i === MAX_INI && priority === MAX_INI) return true;
        return priority < i && priority >= i - INI_STP;
      };
      attackersDamage.filter(filterCb).forEach((damage) => {
        Combat.assignDamages(damage, this._defendingForces);
      });
      defendersDamage.filter(filterCb).forEach((damage) => {
        Combat.assignDamages(damage, this._attackingFleets);
      });
    }
  }

  private executeLoot(): void {
    const extractorFleets = this._attackingFleets.filter(({ capacity }) => capacity > 0);
    const totalCapacity = extractorFleets.reduce((acc, { capacity }) => acc + capacity, 0);
    const initialRoids = [...this._galaxy.roids];
    for (const fleet of extractorFleets) {
      // Calculates fleet weight and starts extraction
      const weight = fleet.capacity / totalCapacity;
      const extractedRoids = fleet.extract([
        floor(initialRoids[0] * weight),
        floor(initialRoids[1] * weight),
        floor(initialRoids[2] * weight),
      ]);
      // Update galaxy roids count
      this._galaxy.roids = [
        this._galaxy.roids[0] - extractedRoids[0],
        this._galaxy.roids[1] - extractedRoids[1],
        this._galaxy.roids[2] - extractedRoids[2],
      ];
    }
  }

  private createLog(): void {
    this._logs.push({
      round: this._rounds,
      attack: this.attackingGroups,
      defense: this.defendingGroups,
      baseStorage: this._galaxy.roids,
      attackStorage: this._attackingFleets.map(({ roids }) => roids),
    });
  }

  public advance() {
    this._rounds += 1;
    this.executeCombat();
    this.executeLoot();
    this.createLog();
  }

  public resolve(): void {
    while (
      Combat.getFuselage(this._attackingFleets) > 0 &&
      Combat.getFuselage(this._defendingForces) > 0
    ) {
      this.advance();
    }
  }
}

export default Combat;
