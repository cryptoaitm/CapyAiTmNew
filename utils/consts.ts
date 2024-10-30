import { crystal1, crystal2, crystal3, crystal4, crystal5, crystal6, crystal7, crystal8, crystal9, mainCharacter } from "@/images";
import { StaticImageData } from "next/image";

export const WALLET_MANIFEST_URL = "https://violet-fast-mouse-770.mypinata.cloud/ipfs/QmUuWcJ5BjtmF44SEVruaMwoTfJXv5Cyf3aWbztWuxKQeh";

export interface LevelData {
  name: string;
  minPoints: number;
  bigImage: StaticImageData;
  smallImage: StaticImageData;
  color: string;
  friendBonus: number;
  friendBonusPremium: number;
}

export const LEVELS: LevelData[] = [
  {
    name: "Capy",
    minPoints: 0,
    bigImage: mainCharacter,
    smallImage: crystal1,
    color: "#2adaf8",
    friendBonus: 0,
    friendBonusPremium: 0,
  },
  {
    name: "Frosty Freelancer",
    minPoints: 5000000,
    bigImage: mainCharacter,
    smallImage: crystal2,
    color: "#d64767",
    friendBonus: 2000000,
    friendBonusPremium: 3000000,
  },
  {
    name: "Chilly Consultant",
    minPoints: 2500000,
    bigImage: mainCharacter,
    smallImage: crystal3,
    color: "#e9c970",
    friendBonus: 3000000,
    friendBonusPremium: 50000000,
  },
  {
    name: "Glacial Manager",
    minPoints: 1000000,
    bigImage: mainCharacter,
    smallImage: crystal4,
    color: "#73e94b",
    friendBonus: 50000000,
    friendBonusPremium: 100000000,
  },
  {
    name: "Subzero Supervisor",
    minPoints: 10000000,
    bigImage: mainCharacter,
    smallImage: crystal5,
    color: "#4ef0ba",
    friendBonus: 100000000,
    friendBonusPremium: 1000000000,
  },
  {
    name: "Arctic Executive",
    minPoints: 2000000000,
    bigImage: mainCharacter,
    smallImage: crystal6,
    color: "#1a3ae8",
    friendBonus: 1000000000,
    friendBonusPremium: 2500000000,
  },
  {
    name: "Polar CEO",
    minPoints: 10000000,
    bigImage: mainCharacter,
    smallImage: crystal7,
    color: "#902bc9",
    friendBonus: 2500000000,
    friendBonusPremium: 5000000000,
  },
  {
    name: "Tundra Tycoon",
    minPoints: 5000000000,
    bigImage: mainCharacter,
    smallImage: crystal8,
    color: "#fb8bee",
    friendBonus: 5000000000,
    friendBonusPremium: 100000000000,
  },
  {
    name: "Capy Mogul",
    minPoints: 100000000000,
    bigImage: mainCharacter,
    smallImage: crystal9,
    color: "#e04e92",
    friendBonus: 100000000000,
    friendBonusPremium: 1000000000000,
  }
];

export const DAILY_REWARDS = [
  500,
  1000,
  2500,
  5000,
  15000,
  25000,
  100000,
  500000,
  1000000,
  5000000
];

export const MAXIMUM_INACTIVE_TIME_FOR_MINE = 3*60*60*1000; // 3 hours in milliseconds

export const MAX_ENERGY_REFILLS_PER_DAY = 6;
export const ENERGY_REFILL_COOLDOWN = 60 * 60 * 1000; // 1 hour in milliseconds
export const TASK_WAIT_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export const REFERRAL_BONUS_BASE = 5000;
export const REFERRAL_BONUS_PREMIUM = 25000;


// Multitap
export const multitapUpgradeBasePrice = 1000;
export const multitapUpgradeCostCoefficient = 2;

export const multitapUpgradeBaseBenefit = 1;
export const multitapUpgradeBenefitCoefficient = 1;

// Energy
export const energyUpgradeBasePrice = 1000;
export const energyUpgradeCostCoefficient = 2;

export const energyUpgradeBaseBenefit = 500;
export const energyUpgradeBenefitCoefficient = 1;

// Mine (profit per hour)
export const mineUpgradeBasePrice = 1000;
export const mineUpgradeCostCoefficient = 1.5;

export const mineUpgradeBaseBenefit = 100;
export const mineUpgradeBenefitCoefficient = 1.2;