import { Unit, BalanceStats } from '../Types';
import referenceValues from './referenceValues';

function round(n: number, decimalPlaces: number): number {
  return Math.round((n + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

function hitPercentage(weaponsSpeed: number, agility: number): number {
  return (weaponsSpeed - agility + 100) / 2 / 100;
}

function balanceStats({
  name,
  rank,
  initiative,
  fuselage,
  agility,
  firePower,
  fireRate,
  quantityOfWeapons,
  weaponsSpeed,
  metalium,
  carbonum,
  plutonium,
}: Unit): BalanceStats {
  const { AVG_INI, AVG_AGI, AVG_WSD, CAR_MULT, PLU_MULT, RES_MULT } = referenceValues;
  const damageOutput = firePower * fireRate * quantityOfWeapons;
  const attack = damageOutput * hitPercentage(weaponsSpeed, AVG_AGI);
  const defense = fuselage / hitPercentage(AVG_WSD, agility);
  const combatRatio = attack / defense;
  const initiativeFactor = (initiative / AVG_INI) ** 2;
  const powerIndex = initiativeFactor * ((attack + defense) / 2);
  const resourceCost = metalium + carbonum * CAR_MULT + plutonium * PLU_MULT;
  const benefitCostRatio = powerIndex / (resourceCost * RES_MULT);

  return {
    name,
    rank,
    initiative,
    attack: round(attack, 0),
    defense: round(defense, 0),
    combatRatio: round(combatRatio, 2),
    powerIndex: round(powerIndex, 0),
    resourceCost,
    benefitCostRatio,
  };
}

export { balanceStats };
