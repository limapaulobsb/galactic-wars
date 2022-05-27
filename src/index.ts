import Combat from './classes/Combat';
import { Fleet } from './classes/Force';
import Galaxy from './classes/Galaxy';
import { Extractors, Fighters } from './classes/Units';

const humanFleet = new Fleet([
  new Fighters('Artemis', 2000),
  new Fighters('Perseus', 1000),
  new Fighters('Hera', 1000),
  new Fighters('Demeter', 500),
  new Fighters('Vulcan', 500),
  new Fighters('Ares', 500),
  new Fighters('Thanatos', 200),
  // new Extractors('Neptune',200),
  new Fighters('Hermes', 100),
  new Fighters('Apollo', 100),
  new Fighters('Hercules', 50),
  new Fighters('Zeus', 50),
]);

const daharanFleet = new Fleet([
  new Fighters('Osiris', 5000),
  new Fighters('Isis', 1000),
  new Fighters('Horus', 500),
  new Fighters('Set', 500),
  new Fighters('Geb', 500),
  new Fighters('Bastet', 250),
  new Fighters('Nut', 100),
  new Fighters('Sekhmet', 50),
  new Fighters('Anubis', 50),
  // new Extractors('Thoth',50),
  new Fighters('Nephthys', 50),
  new Fighters('Amun-Ra', 25),
]);

const extractorFleet1 = new Fleet([new Extractors('Neptune', 300)]);
const extractorFleet2 = new Fleet([new Extractors('Neptune', 300)]);

// const baseDefense = new BaseDefense([
//   new Defenses('Laser Cannon', 2000),
//   new Defenses('Inferno Tower', 1000),
//   new Defenses('Eagle Artillery', 500),
//   new Defenses('Phaser', 200),
//   new Defenses('Doctor', 100),
//   new Defenses('Death Star', 50),
// ]);

const galaxy = new Galaxy([400, 400, 400]);

const combat = new Combat([humanFleet, extractorFleet1, extractorFleet2], [daharanFleet], galaxy);

combat.advance();

console.dir(combat.logs, { depth: null });
