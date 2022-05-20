import { Damage, Encounter, GroupInfo, Target } from '../../types';
import { Fleet } from '../Force';
import Galaxy from '../Galaxy';
import { ceil, referenceValues, round } from '../../utils';

class Combat implements Encounter {
  constructor(
    private _attackingFleets: Fleet[],
    private _defendingFleets: Fleet[],
    private _galaxy: Galaxy = new Galaxy()
  ) {}

  get attackingFleets(): GroupInfo[][] {
    return this._attackingFleets.map((fleet) => fleet.groups);
  }

  get defendingFleets(): GroupInfo[][] {
    return this._defendingFleets.map((fleet) => fleet.groups);
  }

  assignDamage = ({ type, output, speed, priority }: Damage, target: Target): void => {
    let forces = [];
    if (target === 'attackers') {
      forces = [...this._attackingFleets];
    } else {
      forces = [...this._defendingFleets, this._galaxy.defense];
    }
    // Calculates the weight of each force and passes the damage along
    const initialFuselage = forces.reduce((acc, curr) => acc + curr.fuselage, 0);
    for (const force of forces) {
      const weight = ceil(force.fuselage / initialFuselage, 3);
      const damage = {
        type,
        output: round(output * weight, 0),
        speed,
        priority,
      };
      force.receiveDamage(damage);
    }
  };

  // The number of combat phases (strikes) is predefined
  // Units with higher initiative attack earlier
  execute(): void {
    const { MAX_INI, MIN_INI, INI_STP } = referenceValues;
    for (let i = MAX_INI; i > MIN_INI; i -= INI_STP) {
      // Set attackers and defenders damage arrays
      const attackersDamage = this._attackingFleets
        .map((fleet) => fleet.damage)
        .reduce((acc, curr) => acc.concat(curr), []);
      const defendersDamage = this._defendingFleets
        .map((fleet) => fleet.damage)
        .concat(this._galaxy.defense.damage)
        .reduce((acc, curr) => acc.concat(curr), []);
      // Callback function to filter damage by priority
      const callback = ({ priority }: Damage) => {
        // Fix for max priority to be included
        if (i === MAX_INI && priority === MAX_INI) return true;
        return priority < i && priority >= i - INI_STP;
      };
      // Damage assignment
      attackersDamage.filter(callback).forEach((damage) => {
        this.assignDamage(damage, 'defenders');
      });
      defendersDamage.filter(callback).forEach((damage) => {
        this.assignDamage(damage, 'attackers');
      });
    }
  }
}

export default Combat;
