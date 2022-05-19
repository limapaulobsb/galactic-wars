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
  damageType: string;
  firePower: number;
  fireRate: number;
  quantityOfWeapons: number;
  weaponsSpeed: number;
  fuselage: number;
  agility: number;
  initiative: number;
  empResistance: number;
  metalium: number;
  carbonum: number;
  plutonium: number;
};

type Count = {
  available: number;
  affected: number;
  destroyed: number;
  neutralized: number;
};

type Damage = {
  type: string;
  output: number;
  speed: number;
  priority?: number;
};

type GroupInfo = {
  name: string;
  count: Count;
};

type Roids = {
  metalium: number;
  carbonum: number;
  plutonium: number;
};

interface Group {
  data: Unit;
  count: Count;
  damage: Damage;
  fuselage: number;
  addUnits(count: number): void;
  removeUnits(count: number): void;
  receiveDamage(damage: Damage): void;
}

interface SuperGroup {
  groups: GroupInfo[];
  damage: Damage[];
  fuselage: number;
  addUnits(name: string, count: number): void;
  removeShips(name: string, count: number): void;
  receiveDamage(damage: Damage): void;
}

interface Base {
  defense: GroupInfo[];
  roids: Roids;
}

type BalanceStats = {
  name: string;
  rank: Rank;
  damage: number;
  fuselage: number;
  combatRatio: number;
  initiativeRatio: number;
  powerIndex: number;
  resourceCost: number;
  benefitCostRatio: number;
};

export {
  BalanceStats,
  Base,
  Count,
  Damage,
  Group,
  GroupInfo,
  Rank,
  Roids,
  SuperGroup,
  Unit,
};