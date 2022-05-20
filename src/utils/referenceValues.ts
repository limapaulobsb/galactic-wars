// Unit stats
const MIN_WSD = 10; // Minimum weapons speed
const MAX_WSD = 100; // Maximum weapons speed
const AVG_WSD = (MAX_WSD + MIN_WSD) / 2; // Average weapons speed
const MIN_AGI = 0; // Minimum agility
const MAX_AGI = 90; // Maximum agility
const AVG_AGI = (MAX_AGI + MIN_AGI) / 2; // Average weapons speed
const MIN_INI = 50; // Minimum initiative
const MAX_INI = 90; // Maximum initiative
const AVG_INI = (MAX_INI + MIN_INI) / 2; // Average weapons speed
const EMP_MUL = 1.25; // EMP damage multiplier

// Resources
const CAR_MUL = 2; // Carbonum multiplier
const PLU_MUL = 4; // Plutonium multiplier
const RES_MUL = 100; // Resource multiplier

// Combat
const NUM_STK = 4; // Number of strikes
const INI_STP = (MAX_INI - MIN_INI) / NUM_STK; // Initiative Step

export default {
  MIN_WSD,
  MAX_WSD,
  AVG_WSD,
  MIN_AGI,
  MAX_AGI,
  AVG_AGI,
  MIN_INI,
  MAX_INI,
  AVG_INI,
  EMP_MUL,
  CAR_MUL,
  PLU_MUL,
  RES_MUL,
  NUM_STK,
  INI_STP,
};
