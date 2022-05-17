enum Rank {
  'Fighter',
  'Corvette',
  'Frigate',
  'Destroyer',
  'Cruiser',
  'Mothership',
}

type Unit = {
  name: string;
  rank: Rank;
  race: string | undefined;
  initiative: number;
  fuselage: number;
  agility: number;
  firePower: number;
  fireRate: number;
  quantityOfWeapons: number;
  weaponsSpeed: number;
  damageType: string;
  empResistance: number;
  metalium: number;
  carbonum: number;
  plutonium: number;
};

interface UnitGroup {
  data: Unit;
  name: string;
  rank: string;
  initiative: number;
  fuselage: number;
  agility: number;
  damageOutput: number;
  weaponsSpeed: number;
  damageType: string;
  empResistance: number;
  count: number;
  affected: number;
  destroyed: number;
  neutralized: number;
}

type BalanceStats = {
  name: string;
  rank: Rank;
  initiative: number;
  attack: number;
  defense: number;
  combatRatio: number;
  powerIndex: number;
  resourceCost: number;
  benefitCostRatio: number;
};

export { Rank, Unit, UnitGroup, BalanceStats };
