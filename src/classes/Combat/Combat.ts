import { CombatLog, Damage, Encounter, GroupInfo, SuperGroup } from '../../types';
import { Fleet } from '../Force';
import Galaxy from '../Galaxy';
import { ceil, referenceValues, round } from '../../utils';

class Combat implements Encounter {
  private attackingForces: SuperGroup[];
  private defendingForces: SuperGroup[];
  private _rounds = 0;
  private _logs: CombatLog[] = [];
  constructor(
    attackingFleets: Fleet[],
    defendingFleets: Fleet[],
    private _galaxy: Galaxy = new Galaxy()
  ) {
    this.attackingForces = [...attackingFleets];
    this.defendingForces = [...defendingFleets, this._galaxy.defense];
  }

  get logs(): CombatLog[] {
    return this._logs;
  }

  static getDamage(forces: SuperGroup[]): Damage[] {
    return forces.map((fleet) => fleet.damage).flat();
  }

  static getFuselage(forces: SuperGroup[]): number {
    return forces.reduce((acc, curr) => acc + curr.fuselage, 0);
  }

  static assignDamage = ({ type, output, speed }: Damage, forces: SuperGroup[]): void => {
    // Calculates the weight of each force and passes the damage along
    const initialFuselage = Combat.getFuselage(forces);
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

  get attackingGroups(): GroupInfo[][] {
    return this.attackingForces.map(({ groups }) => groups);
  }

  get defendingGroups(): GroupInfo[][] {
    return this.defendingForces.map(({ groups }) => groups);
  }

  // The number of combat phases (strikes) is predefined
  // Units with higher initiative attack earlier
  execute(): void {
    const { MAX_INI, MIN_INI, INI_STP } = referenceValues;
    for (let i = MAX_INI; i > MIN_INI; i -= INI_STP) {
      const attackersDamage = Combat.getDamage(this.attackingForces);
      const defendersDamage = Combat.getDamage(this.defendingForces);
      // Callback function to filter damage by priority
      const callback = ({ priority }: Damage) => {
        if (!priority) return false;
        // Fix for max priority to be included
        if (i === MAX_INI && priority === MAX_INI) return true;
        return priority < i && priority >= i - INI_STP;
      };
      attackersDamage.filter(callback).forEach((damage) => {
        Combat.assignDamage(damage, this.attackingForces);
      });
      defendersDamage.filter(callback).forEach((damage) => {
        Combat.assignDamage(damage, this.defendingForces);
      });
    }
    this._rounds += 1;
    this._logs.push({
      round: this._rounds,
      attack: this.attackingGroups,
      defense: this.defendingGroups,
    });
  }

  resolve(): void {
    while (
      Combat.getFuselage(this.attackingForces) > 0 &&
      Combat.getFuselage(this.defendingForces) > 0
    ) {
      this.execute();
    }
  }
}

export default Combat;
