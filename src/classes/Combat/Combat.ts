import { Damage, Encounter, GroupInfo, SuperGroup } from '../../types';
import { Fleet } from '../Force';
import Galaxy from '../Galaxy';
import { ceil, referenceValues, round } from '../../utils';

class Combat implements Encounter {
  constructor(
    private _attackingFleets: Fleet[],
    private _defendingFleets: Fleet[],
    private _galaxy: Galaxy = new Galaxy()
  ) {}

  get attackingForces(): SuperGroup[] {
    return this._attackingFleets;
  }

  get defendingForces(): SuperGroup[] {
    return [...this._defendingFleets, this._galaxy.defense];
  }

  get attackingFleets(): GroupInfo[][] {
    return this._attackingFleets.map((fleet) => fleet.groups);
  }

  get defendingFleets(): GroupInfo[][] {
    return this._defendingFleets.map((fleet) => fleet.groups);
  }

  getDamage(forces: SuperGroup[]): Damage[] {
    return forces
      .map((fleet) => fleet.damage)
      .reduce((acc, curr) => acc.concat(curr), []);
  }

  getFuselage(forces: SuperGroup[]): number {
    return forces.reduce((acc, curr) => acc + curr.fuselage, 0);
  }

  assignDamage = ({ type, output, speed }: Damage, forces: SuperGroup[]): void => {
    // Calculates the weight of each force and passes the damage along
    const initialFuselage = this.getFuselage(forces);
    for (const force of forces) {
      const weight = ceil(force.fuselage / initialFuselage, 3);
      const damage = {
        type,
        output: round(output * weight, 0),
        speed,
      };
      force.receiveDamage(damage);
    }
  };

  // The number of combat phases (strikes) is predefined
  // Units with higher initiative attack earlier
  execute(): void {
    const { MAX_INI, MIN_INI, INI_STP } = referenceValues;
    for (let i = MAX_INI; i > MIN_INI; i -= INI_STP) {
      const attackersDamage = this.getDamage(this.attackingForces);
      const defendersDamage = this.getDamage(this.defendingForces);
      // Callback function to filter damage by priority
      const callback = ({ priority }: Damage) => {
        if (!priority) return false;
        // Fix for max priority to be included
        if (i === MAX_INI && priority === MAX_INI) return true;
        return priority < i && priority >= i - INI_STP;
      };
      attackersDamage.filter(callback).forEach((damage) => {
        this.assignDamage(damage, this.attackingForces);
      });
      defendersDamage.filter(callback).forEach((damage) => {
        this.assignDamage(damage, this.defendingForces);
      });
    }
  }

  resolve(): void {
    let combatCount = 0;
    while (
      this.getFuselage(this.attackingForces) > 0 &&
      this.getFuselage(this.defendingForces) > 0
    ) {
      this.execute();
      combatCount++;
    }
    console.log(`Combat ended in ${combatCount} rounds`);
  }
}

export default Combat;
