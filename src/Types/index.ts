enum Class {
  'Fighter',
  'Corvette',
  'Frigate',
  'Destroyer',
  'Cruiser',
  'Mothership',
}

type Ship = {
  name: string,
  class: Class,
  initiative: number,
  agility: number,
  weaponsSpeed: number,
  firePower: number,
  fireRate: number,
  quantityOfWeapons: number,
  damageType: string,
  fuselage: number,
  empResistance: number,
}

interface ShipGroup {
  data: Ship;
  name: string;
  class: string;
  initiative: number;
  agility: number;
  weaponsSpeed: number;
  damageOutput: number;
  damageType: string;
  fuselage: number;
  empResistance: number;
  count: number;
  affected: number;
  destroyed: number;
  neutralized: number;
}

export { Class, Ship, ShipGroup };
