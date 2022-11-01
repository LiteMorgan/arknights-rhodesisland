import slugify from "slugify";

export const PROFESSION_SORT_ORDER = [
  "WARRIOR",
  "SNIPER",
  "TANK",
  "MEDIC",
  "SUPPORT",
  "CASTER",
  "SPECIAL",
  "PIONEER",
];

type ProfessionReference = {
  [key: string]: string;
};
export const PROFESSION_REFERENCE: ProfessionReference = {
  WARRIOR: "Guard",
  SNIPER: "Sniper",
  TANK: "Defender",
  MEDIC: "Medic",
  SUPPORT: "Supporter",
  SPECIAL: "Specialist",
  CASTER: "Caster",
  PIONEER: "Vanguard",
};

export const DEFAULT_OPERATOR_PROGRESS = [true, 0, 1, 1, 0, 1, 0, 0, 0];

export const mapProgressValues = (values) => [
  values.recruited,
  values.elite,
  values.level,
  values.potential,
  values.trust,
  values.skill,
  values.skill1,
  values.skill2,
  values.skill3,
];

export const slugifyOpName = (str) => {
  return slugify(str.toLowerCase(), { remove: /[*+~.()'"!:@]/g });
};

export const toTitleCase = (str) => {
  str = str.toLowerCase();
  return str.replace(str.substr(0, 1), str.substr(0, 1).toUpperCase());
};

export const getAttackType = (profession, subProfessionId, description) => {
  if (subProfessionId === "bard") return "None";
  if (profession === "Medic") return "Healing";
  const cleanDescription = description
    .replace(/<(\/|([@$a-z.]+))>/g, "")
    .toLowerCase();
  return cleanDescription.includes("arts damage") ||
    cleanDescription.includes("法术伤害")
    ? "Arts"
    : "Physical";
};
