import referenceValues from './referenceValues';
import { BalanceStats, Unit } from '../types';

const {
  MIN_WSD,
  MAX_WSD,
  AVG_WSD,
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

function ceil(n: number, decimalPlaces = 0): number {
  return Math.ceil(n * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

function floor(n: number, decimalPlaces = 0): number {
  return Math.floor(n * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

function round(n: number, decimalPlaces = 0): number {
  return Math.round(n * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

function randomInt(min = 0, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
      agility,
      initiative,
      metalium,
      carbonum,
      plutonium,
    }) => {
      const output = firePower * fireRate * quantityOfWeapons;
      const attack = output * hitPercentage(weaponsSpeed, AVG_AGI);
      // if (damageType === 'EMP') attack /= EMP_MUL;
      const defense = fuselage / hitPercentage(AVG_WSD, agility || 0);
      const combatRatio = attack / fuselage;
      const averagePower = (attack + defense) / 2;
      const initiativeRatio = balanceRatio(initiative, MIN_INI, MAX_INI);
      const initiativeFactor = combatRatio * (NUM_STK - 1);
      const powerIndex = averagePower * initiativeRatio ** initiativeFactor;
      const resourceCost = metalium + carbonum * CAR_MUL + plutonium * PLU_MUL;
      const benefitCostRatio = powerIndex / (resourceCost / RES_MUL);

      return {
        name,
        rank,
        attack: round(attack, 1),
        defense: round(defense, 1),
        combatRatio: round(combatRatio, 2),
        initiativeRatio: round(initiativeRatio, 2),
        powerIndex: round(powerIndex, 1),
        resourceCost,
        benefitCostRatio: round(benefitCostRatio, 2),
      };
    }
  );
}

export {
  balanceRatio,
  balanceStats,
  ceil,
  floor,
  hitPercentage,
  randomInt,
  round,
};
