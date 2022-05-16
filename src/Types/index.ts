enum Rank {
  'Fighter',
  'Corvette',
  'Frigate',
  'Destroyer',
  'Cruiser',
  'Mothership',
}

type BalanceStats = {
  name: string,
  rank: Rank,
  initiative: number,
  attack: number,
  defense: number,
  combatRatio: number,
  resourceCost: number,
  powerIndex: number,
  costBenefitRatio: number,
}

type Ship = {
  name: string,
  rank: Rank,
  race: string,
  initiative: number,
  fuselage: number,
  agility: number,
  firePower: number,
  fireRate: number,
  quantityOfWeapons: number,
  weaponsSpeed: number,
  damageType: string,
  empResistance: number,
  metalium: number,
	carbonum: number,
	plutonium: number,
}

interface ShipGroup {
  data: Ship;
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

export { Rank, BalanceStats, Ship, ShipGroup };
