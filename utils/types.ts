export enum Sizes {
  sm = "SM",
  md = "MD",
}

export enum Profession {
  caster = "CASTER",
  medic = "MEDIC",
  pioneer = "PIONEER",
  sniper = "SNIPER",
  special = "SPECIAL",
  support = "SUPPORT",
  tank = "TANK",
  warrior = "WARRIOR",
}

export interface IRangeObject {
  id: string;
  direction: number;
  grids: { row: number; col: number }[];
}

export interface IOpStats {
  maxHp: number;
  atk: number;
  def: number;
  magicResistance: number;
  cost: number;
  blockCnt: number;
  moveSpeed: number;
  attackSpeed: number;
  baseAttackTime: number;
  respawnTime: number;
  hpRecoveryPerSec: number;
  spRecoveryPerSec: number;
  maxDeployCount: number;
  maxDeckStackCnt: number;
  tauntLevel: number;
  massLevel: number;
  baseForceLevel: number;
  stunImmune: boolean;
  silenceImmune: boolean;
  sleepImmune: boolean;
  frozenImmune: boolean;
  levitateImmune: boolean;
}

export interface IPhases {
  characterPrefabKey: string;
  rangeId: string;
  maxLevel: number;
  attributesKeyFrames: { level: number; data: IOpStats }[];
  range: IRangeObject;
  evolveCost:
    | {
        id: string;
        count: number;
        type: string;
      }[]
    | null;
}

export interface IFavorKeyFrames {
  level: number;
  data: IOpStats;
}

export interface IPotentialRanks {
  type: number;
  description: string;
  equivalentCost: null;
  buff: {
    attributes: {
      attributeModifiers: {
        attributeType: number;
        value: number;
      }[];
    };
  } | null;
}

export interface IStatData {
  base: number;
  core: number;
  name: string;
  potential: number | null;
  trust: number | null;
  value: number;
}

export interface IStatPercentages {
  artsResistance: IStatData;
  attack: IStatData;
  attacksPerSecond: IStatData;
  blockCount: IStatData;
  defense: IStatData;
  dpCost: IStatData;
  health: IStatData;
  redeployTime: IStatData;
}

export interface ILevelStatData {
  base: number;
  trust: number;
  potential: number;
  max: number;
}

export interface ILevelStats {
  artsResistance: ILevelStatData;
  attack: ILevelStatData;
  attacksPerSecond: ILevelStatData;
  blockCount: number;
  defense: ILevelStatData;
  dpCost: ILevelStatData;
  health: ILevelStatData;
  redeployTime: ILevelStatData;
}

export interface IPotentialStatChanges {
  artsResistance: number;
  attack: number;
  attackSpeed: number;
  defense: number;
  dpCost: number;
  health: number;
  redeployTime: number;
}
