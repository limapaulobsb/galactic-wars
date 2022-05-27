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
  type?: string;
  rank: Rank;
  race?: string;
  damageType: string;
  firePower: number;
  fireRate: number;
  quantityOfWeapons: number;
  weaponsSpeed: number;
  fuselage: number;
  agility?: number;
  initiative: number;
  empResistance: number;
  storageCapacity?: number;
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
  weaponsSpeed: number;
  priority: number;
};

type GroupInfo = {
  name: string;
  count: Count;
};

type Roids = [number, number, number];

type CombatLog = {
  round: number;
  attack: GroupInfo[][];
  defense: GroupInfo[][];
  baseStorage: Roids;
  attackStorage: Roids[];
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
  damages: Damage[];
  fuselage: number;
  addUnits(name: string, count: number): void;
  removeUnits(name: string, count: number): void;
  distributeDamages(damage: Damage): void;
}

interface Base {
  defense: SuperGroup;
  roids: Roids;
}

interface Encounter {
  attackingGroups: GroupInfo[][];
  defendingGroups: GroupInfo[][];
  logs: CombatLog[];
  // joinFleet(fleet: SuperGroup): void;
  // withdrawFleet(id: string): void;
  advance(): void;
  resolve(): void;
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
  CombatLog,
  Count,
  Damage,
  Encounter,
  Group,
  GroupInfo,
  Rank,
  Roids,
  SuperGroup,
  Unit,
};
