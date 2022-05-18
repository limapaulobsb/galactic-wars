// import shipData from './data/shipData';
// import defenseData from './data/defenseData';
// import { balanceStats } from './utils';
import { Ships } from './Units';
import Fleet from './Fleet';

// <<<==========    Balance Stats   ==========>>>

// console.log(shipData.map(balanceStats));
// console.log(defenseData.map(balanceStats));
// console.log(balanceStats(shipData[0]));

// <<<==========    Unit Groups   ==========>>>

const artemisGroup1 = new Ships('Artemis', 3000);
// const perseusGroup1 = new Ships('Perseus', 2000);
// const heraGroup1 = new Ships('Hera', 2000);
// const demeterGroup1 = new Ships('Demeter', 2000);
// const vulcanGroup1 = new Ships('Vulcan', 1500);
// const aresGroup1 = new Ships('Ares', 1200);
// const thanatosGroup1 = new Ships('Thanatos', 1000);
// const hermesGroup1 = new Ships('Hermes', 750);
// const apolloGroup1 = new Ships('Apollo', 500);
// const herculesGroup1 = new Ships('Hercules', 300);
// const zeusGroup1 = new Ships('Zeus', 500);
// const neptuneGroup1 = new Ships('Neptune', 100);

// const osirisGroup1 = new Ships('Osiris', 5000);
// const isisGroup1 = new Ships('Isis', 5000);
// const horusGroup1 = new Ships('Horus', 4000);
// const setGroup1 = new Ships('Set', 4000);
// const gebGroup1 = new Ships('Geb', 3000);
// const bastetGroup1 = new Ships('Bastet', 2000);
// const nutGroup1 = new Ships('Nut', 1000);
// const sekhmetGroup1 = new Ships('Sekhmet', 600);
// const anubisGroup1 = new Ships('Anubis', 400);
// const nephthysGroup1 = new Ships('Nephthys', 300);
// const amunraGroup1 = new Ships('Amun-Ra', 500);
// const thothGroup1 = new Ships('Thoth', 100);

// const cannonGroup1 = new Defenses('Laser Cannon', 5000);

// console.log(artemisGroup1.data);
// console.log(artemisGroup1.count);

// <<<==========    Fleets    ==========>>>

const fleet1 = new Fleet([
  artemisGroup1,
  // perseusGroup1,
  // heraGroup1,
  // demeterGroup1,
  // vulcanGroup1,
  // aresGroup1,
  // thanatosGroup1,
  // hermesGroup1,
  // apolloGroup1,
  // herculesGroup1,
  // zeusGroup1,
  // osirisGroup1,
  // isisGroup1,
  // horusGroup1,
  // setGroup1,
  // gebGroup1,
  // bastetGroup1, 
  // nutGroup1,
  // sekhmetGroup1,
  // anubisGroup1,
  // nephthysGroup1,
  // amunraGroup1,
  // cannonGroup1,
]);

// fleet1.addShips('Ares', 50);
// fleet1.removeShips('Zeus', 500);


console.log(fleet1.ships);
console.log(fleet1.damage.reduce((acc, curr) => acc + curr.output, 0));
console.log(fleet1.fuselage);


fleet1.receiveDamage({ type: 'Normal', output: 59999, speed: 55 });
fleet1.receiveDamage({ type: 'Normal', output: 1, speed: 55 });

// fleet1.receiveDamage({ type: 'EMP', output: 100000, speed: 55 });

console.log(fleet1.ships);
