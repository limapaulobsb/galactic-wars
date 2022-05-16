import { BalanceStats, Ship } from './Types';

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
}: Ship): BalanceStats {
  const damageOutput = firePower * fireRate * quantityOfWeapons;
  const attack = damageOutput * hitPercentage(weaponsSpeed, 50);
  const defense = fuselage / hitPercentage(50, agility);
  const combatRatio = attack / defense;
  const resourceCost = metalium + carbonum * 2 + plutonium * 4;
  const initiativeFactor = (initiative / 50) ** 2;
  const powerIndex = initiativeFactor * ((attack + defense) / 2);
  const costBenefitRatio = resourceCost / 100 / powerIndex;

  return {
    name,
    rank,
    initiative,
    attack,
    defense,
    combatRatio,
    resourceCost,
    powerIndex,
    costBenefitRatio,
  };
}

export { balanceStats };
