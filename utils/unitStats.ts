import {
  IFavorKeyFrames,
  ILevelStatData,
  ILevelStats,
  IPhases,
  IPotentialRanks,
  IPotentialStatChanges,
  IStatPercentages,
} from "./types";

const ATTACK_MAX = 1210.0;
const DEFENSE_MAX = 826.0;
const HP_MAX = 4225.0;
const RESISTANCE_MAX = 100.0;

const STAT_MODIFIER_LOOKUP: { [key: number]: string } = {
  0: "health",
  1: "attack",
  2: "defense",
  3: "artsResistance",
  4: "dpCost",
  7: "attackSpeed",
  21: "redeployTime",
};

export const percentage = (value: number, max: number) => (value / max) * 100;

export const linearInterpolation = (
  level: number,
  maxLevel: number,
  value: number,
  maxValue: number
): number => {
  return Math.round(
    value + ((level - 1) * (maxValue - value)) / (maxLevel - 1)
  );
};

/**
 * Calculate an Operator's attack speed with any bonuses in seconds.
 *
 * @param {number} baseAttackTime - Base attack time in seconds
 * @param {number} attackSpeed - Attack speed increase. Defaults to `100`.
 * @returns number
 */
export const calculateAttackSpeed = (
  baseAttackTime: number,
  attackSpeed = 0
): number => {
  return Math.round((baseAttackTime * 30) / (attackSpeed / 100.0)) / 30;
};

export const getPotentialStatIncreases = (
  potentialRanks: IPotentialRanks[]
): IPotentialStatChanges[] => {
  const statChanges = [];
  const defaultStats = {
    health: 0,
    attack: 0,
    defense: 0,
    artsResistance: 0,
    dpCost: 0,
    attackSpeed: 0,
    redeployTime: 0,
    description: null,
  };

  for (const rank of potentialRanks) {
    const desc = rank.description;

    if (rank.buff === null) {
      statChanges.push({
        ...defaultStats,
        description: desc,
      });
      continue;
    }

    const statType = rank.buff.attributes.attributeModifiers[0].attributeType;
    const statValue = rank.buff.attributes.attributeModifiers[0].value;

    const statKey = STAT_MODIFIER_LOOKUP[statType];

    if (!statKey) {
      console.warn("Attribute ${statType} is not recognised.");
      continue;
    }

    statChanges.push({
      ...defaultStats,
      [statKey]: statValue,
    });
  }

  return statChanges;
};

interface CalculateProgress {
  eliteLevel: number;
  opLevel: number;
  trust: boolean;
  pots: IPotentialStatChanges[];
  potLevel: number;
}

export const calculateStatsAtLevel = (
  phases: IPhases[],
  favorKeyFrames: IFavorKeyFrames[],
  progress: CalculateProgress = {
    eliteLevel: 0,
    opLevel: 1,
    trust: true,
    pots: [],
    potLevel: 6,
  }
): ILevelStats => {
  const { eliteLevel, opLevel, trust, pots, potLevel } = progress;
  const { maxLevel, ...activePhase } = phases[eliteLevel];

  const minLevelData = activePhase.attributesKeyFrames[0];
  const maxLevelData = activePhase.attributesKeyFrames[1];

  const {
    maxHp,
    atk,
    def,
    magicResistance: res,
    cost,
    blockCnt,
    respawnTime,
    baseAttackTime,
  } = minLevelData.data;

  const {
    maxHp: endMaxHp,
    atk: endAtk,
    def: endDef,
    magicResistance: endRes,
  } = maxLevelData.data;

  const {
    maxHp: trustMaxHp,
    atk: trustAtk,
    def: trustDef,
    magicResistance: trustRes,
  } = favorKeyFrames[1].data;

  const calculateSingleStat = (startKey: number, endKey = 0) =>
    linearInterpolation(opLevel, maxLevel, startKey, endKey);

  const applyPotentialBonus = (stat: string): number => {
    const potLevelZero = potLevel - 2;
    if (potLevelZero === -1) return 0;
    const flattenedPotentialBonuses = pots.slice(0, potLevelZero + 1);
    let attribute = 0;
    for (const level of flattenedPotentialBonuses) {
      attribute = attribute + level[stat as keyof IPotentialStatChanges];
    }
    return attribute;
  };

  const consolidateStats = (
    startKey: number,
    endKey: number | null,
    trustKey: number | null,
    potKey: string
  ): ILevelStatData => {
    const baseStat = endKey ? calculateSingleStat(startKey, endKey) : startKey;
    const trustStat = trust && trustKey ? trustKey : 0;
    const potStat = applyPotentialBonus(potKey);
    const maxStat = baseStat + trustStat + potStat;
    return {
      base: baseStat,
      trust: trustStat,
      potential: potStat,
      max: maxStat,
    };
  };

  const health = consolidateStats(maxHp, endMaxHp, trustMaxHp, "health");
  const attack = consolidateStats(atk, endAtk, trustAtk, "attack");
  const defense = consolidateStats(def, endDef, trustDef, "defense");
  const artsResistance = consolidateStats(
    res,
    endRes,
    trustRes,
    "artsResistance"
  );
  const redeployTime = consolidateStats(
    respawnTime,
    null,
    null,
    "redeployTime"
  );
  const dpCost = consolidateStats(cost, null, null, "dpCost");
  const attacksPerSecond = {
    base: calculateAttackSpeed(baseAttackTime, 100),
    trust: 0,
    potential: applyPotentialBonus("attackSpeed") / 100.0,
    max: calculateAttackSpeed(
      baseAttackTime,
      100 + applyPotentialBonus("attackSpeed")
    ),
  };

  return {
    health,
    attack,
    defense,
    artsResistance,
    dpCost,
    attacksPerSecond,
    redeployTime,
    blockCount: blockCnt,
  };
};

export const unitStatPercentages = (stats: ILevelStats): IStatPercentages => {
  const calculatePercentages = (
    label: string,
    key: string,
    reference: number
  ) => {
    const refStat = stats[key as keyof typeof stats];
    if (typeof refStat === "number") {
      return {
        name: label,
        value: refStat,
        core: percentage(refStat, reference),
        base: percentage(refStat, reference),
        trust: null,
        potential: null,
      };
    }

    return {
      name: label,
      value: refStat.max,
      core: percentage(refStat.max, reference),
      base: percentage(refStat.base, reference),
      trust:
        !refStat.trust || refStat.trust === 0
          ? null
          : percentage(refStat.trust, reference),
      potential:
        !refStat.potential || refStat.potential === 0
          ? null
          : percentage(refStat.potential, reference),
    };
  };

  return {
    health: { ...calculatePercentages("Health", "health", HP_MAX) },
    defense: { ...calculatePercentages("Defense", "defense", DEFENSE_MAX) },
    artsResistance: {
      ...calculatePercentages(
        "Arts Resistance",
        "artsResistance",
        RESISTANCE_MAX
      ),
    },
    redeployTime: {
      ...calculatePercentages("Redeploy Time", "redeployTime", 80),
    },
    attack: { ...calculatePercentages("Attack", "attack", ATTACK_MAX) },
    attacksPerSecond: {
      ...calculatePercentages("Attack Speed", "attacksPerSecond", 10),
    },
    blockCount: { ...calculatePercentages("Block Count", "blockCount", 5) },
    dpCost: {
      name: "Deploy Cost",
      value: stats.dpCost.max,
      core: percentage(stats.dpCost.max, 40),
      base: percentage(stats.dpCost.base, 40),
      trust: null,
      potential:
        stats.dpCost.potential === 0
          ? null
          : Math.abs(percentage(stats.dpCost.potential, 40)),
    },
  };
};
