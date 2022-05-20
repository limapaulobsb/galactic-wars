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

type Log = {
  tick: number;
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
  removeUnits(name: string, count: number): void;
  receiveDamage(damage: Damage): void;
}

interface Base {
  defense: SuperGroup;
  roids: Roids;
}

interface Encounter {
  attackingForces: SuperGroup[];
  defendingForces: SuperGroup[];
  attackingFleets: GroupInfo[][];
  defendingFleets: GroupInfo[][];
  getDamage(forces: SuperGroup[]): Damage[];
  getFuselage(forces: SuperGroup[]): number;
  // joinFleet(fleet: SuperGroup): void;
  // withdrawFleet(id: string): void;
  assignDamage(damage: Damage, forces: SuperGroup[]): void;
  execute(): void;
  resolve(): void;
  // log(): Log[];
}

type BalanceStats = {
  name: string;
  rank: Rank;
  attack: number;
  defense: number;
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
  Encounter,
  Group,
  GroupInfo,
  Log,
  Rank,
  Roids,
  SuperGroup,
  Unit,
};
