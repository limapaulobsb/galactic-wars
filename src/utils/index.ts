import { BalanceStats, Unit } from '../types';
import referenceValues from './referenceValues';

const {
  MIN_WSD,
  MAX_WSD,
  MIN_AGI,
  MAX_AGI,
  AVG_AGI,
  MIN_INI,
  MAX_INI,
  // EMP_MUL,
  CAR_MUL,
  PLU_MUL,
  RES_MUL,
  NUM_STK,
} = referenceValues;

function balanceRatio(n: number, min: number, max: number): number {
  // Indicates how close a number is to an average
  return (n - min) / ((max - min) / 2);
}

function hitPercentage(weaponsSpeed: number, agility: number): number {
  if (agility === 0) return 1;
  const weaponsSpeedRatio = balanceRatio(weaponsSpeed, MIN_WSD, MAX_WSD);
  const agilityRatio = balanceRatio(agility, MIN_AGI, MAX_AGI);
  return ((weaponsSpeedRatio - agilityRatio) / 2 + 1) / 2;
}

function round(n: number, decimalPlaces: number): number {
  return Math.round((n + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

function balanceStats(data: Unit[]): BalanceStats[] {
  return data.map(
    ({
      name,
      rank,
      // damageType,
      firePower,
      fireRate,
      quantityOfWeapons,
      weaponsSpeed,
      fuselage,
      initiative,
      metalium,
      carbonum,
      plutonium,
    }) => {
      const output = firePower * fireRate * quantityOfWeapons;
      const damage = output * hitPercentage(weaponsSpeed, AVG_AGI);
      // if (damageType === 'EMP') damage /= EMP_MUL;
      const combatRatio = damage / fuselage;
      const averagePower = (damage + fuselage) / 2;
      const initiativeRatio = balanceRatio(initiative, MIN_INI, MAX_INI);
      const initiativeFactor = combatRatio * (NUM_STK - 1);
      const powerIndex = averagePower * initiativeRatio ** initiativeFactor;
      const resourceCost = metalium + carbonum * CAR_MUL + plutonium * PLU_MUL;
      const benefitCostRatio = powerIndex / (resourceCost / RES_MUL);

      return {
        name,
        rank,
        damage: round(damage, 1),
        fuselage,
        combatRatio: round(combatRatio, 2),
        initiativeRatio: round(initiativeRatio, 2),
        powerIndex: round(powerIndex, 1),
        resourceCost,
        benefitCostRatio: round(benefitCostRatio, 2),
      };
    }
  );
}

export { referenceValues, hitPercentage, balanceStats };
