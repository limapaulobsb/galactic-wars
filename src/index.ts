import { Defenses, Ships } from './classes/Units';
import { BaseDefense, Fleet } from './classes/Force';
import Galaxy from './classes/Galaxy/Galaxy';
import Combat from './classes/Combat';

// const fleet1 = new Fleet([
//   new Ships('Artemis', 2000),
//   new Ships('Perseus', 1000),
//   new Ships('Hera', 1000),
//   new Ships('Demeter', 500),
//   new Ships('Vulcan', 500),
//   new Ships('Ares', 500),
//   new Ships('Thanatos', 200),
//   new Ships('Hermes',100),
//   new Ships('Apollo', 100),
//   new Ships('Hercules', 50),
//   new Ships('Zeus', 50),
// ]);

// const fleet2 = new Fleet([
//   new Ships('Osiris', 2000),
//   new Ships('Isis', 2000),
//   new Ships('Horus', 1000),
//   new Ships('Set', 1000),
//   new Ships('Geb', 1000),
//   new Ships('Bastet', 500),
//   new Ships('Nut', 200),
//   new Ships('Sekhmet', 100),
//   new Ships('Anubis', 100),
//   new Ships('Nephthys', 50),
//   new Ships('Amun-Ra', 50),
// ]);

const fleet1 = new Fleet([
  new Ships('Artemis', 2000),
  new Ships('Perseus', 1000),
  new Ships('Hera', 1000),
  new Ships('Demeter', 500),
  new Ships('Vulcan', 500),
  new Ships('Ares', 500),
  new Ships('Bastet', 500),
  new Ships('Sekhmet', 100),
  new Ships('Amun-Ra', 50),
]);

const fleet2 = new Fleet([
  new Ships('Artemis', 2000),
  new Ships('Perseus', 1000),
  new Ships('Hera', 1000),
  new Ships('Demeter', 500),
  new Ships('Vulcan', 500),
  new Ships('Ares', 500),
  new Ships('Bastet', 500),
  new Ships('Sekhmet', 100),
  new Ships('Amun-Ra', 50),
]);

const baseDefense = new BaseDefense([new Defenses('Laser Cannon', 2000)]);

const galaxy = new Galaxy(baseDefense);

const combat = new Combat([fleet1], [fleet2], galaxy);

combat.execute();

console.dir(combat.attackingFleets, { depth: null });
console.dir(combat.defendingFleets, { depth: null });
console.dir(baseDefense.groups, { depth: null });
console.log(galaxy.roids);
