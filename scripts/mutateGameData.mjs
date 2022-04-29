import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const { Index } = require("flexsearch");

const characterTableEN = require("./ArknightsGameData/en_US/gamedata/excel/character_table.json");
const characterTableCN = require("./ArknightsGameData/zh_CN/gamedata/excel/character_table.json");
const skillTableEN = require("./ArknightsGameData/en_US/gamedata/excel/skill_table.json");
const skillTableCN = require("./ArknightsGameData/zh_CN/gamedata/excel/skill_table.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIRECTORY = path.join(__dirname, "../data");
fs.mkdirSync(DATA_DIRECTORY, { recursive: true });

const LIMITED_OPS = [
  "char_458_rfrost",
  "char_457_blitz",
  "char_456_ash",
  "char_391_rosmon",
  "char_2023_ling",
  "char_2015_dusk",
  "char_2014_nian",
  "char_113_cqbw",
  "char_1014_nearl2",
  "char_1013_chen2",
  "char_1012_skadi2",
];

const WELFARE_OPS = [
  "char_220_grani",
  "char_131_flameb",
  "char_348_ceylon",
  "char_325_bison",
  "char_383_snsant",
  "char_405_absin",
  "char_345_folnic",
  "char_333_sidero",
  "char_411_tomimi",
  "char_388_mint",
  "char_265_sophia",
  "char_451_robin",
  "char_1011_lava2",
  "char_459_tachak",
  "char_304_zebra",
  "char_474_glady",
  "char_369_bena",
  "char_486_takila",
  "char_496_wildmn",
  "char_4013_kjera",
  "char_4025_aprot2",
  "char_1021_kroos2",
  "char_4036_forcer",
  "char_4045_heidi",
];

void (async () => {
  const characterIdsEn = new Set(Object.keys(characterTableEN));
  const cnExclusiveCharacters = Object.entries(characterTableCN).filter(
    ([charId]) => !characterIdsEn.has(charId)
  );

  const denormaliseCharacters = [
    ...Object.entries(characterTableEN),
    ...cnExclusiveCharacters,
  ]
    .filter(
      ([_, character]) =>
        character.profession !== "TRAP" && !character.isNotObtainable
    )
    .map(([charId, character], i) => {
      const cnExclusive = !characterIdsEn.has(charId);
      const welfareOp = WELFARE_OPS.includes(charId);
      const limitedOp = LIMITED_OPS.includes(charId);
      const characterName = cnExclusive
        ? character.appellation
        : character.name;

      const { name: cnName } = characterTableCN[charId];

      // const phases = character.phases.map((phase) => ({
      //   ...phase,
      // }));

      const skillData = character.skills
        .filter((skill) => skill.skillId !== null)
        .map((skill) => {
          const skillId = skill.skillId;
          const skillName = cnExclusive
            ? skillTableCN[skillId].levels[0].name
            : skillTableEN[skillId].levels[0].name;

          return {
            ...skill,
            name: skillName,
          };
        });

      //     for (const skill of character.skills) {
      //       const skillId = skill.skillId;
      //       if (!skillId) return;
      //       skillMap.push({
      //         ...skill,
      //         name: SkillTableEN[skillId].levels[0].name,
      //       });
      //     }

      return {
        ...character,
        id: charId,
        name: characterName,
        profession: character.profession,
        cnName,
        cnExclusive,
        welfareOp,
        limitedOp,
        // phases,
        skills: skillData,
        maxElite: character.phases.length - 1,
        maxPotential: character.potentialRanks.length + 1,
        maxSkillLevel: character.allSkillLvlup.length + 1,
        fileIndex: i,
      };
    });

  const denormaliseOperators = denormaliseCharacters.filter(
    (character) => character.profession !== "TOKEN"
  );

  const operatorsData = Object.fromEntries(
    denormaliseOperators.map((character) => [character.name, character])
  );

  fs.writeFileSync(
    path.join(DATA_DIRECTORY, "operators.json"),
    JSON.stringify(operatorsData, null, 2)
  );

  const operatorProgress = denormaliseOperators.map((character) => {
    return {
      id: character.id,
      name: character.name,
      profession: character.profession,
      skills: character.skills.map((skill) => skill.name),
      rarity: character.rarity + 1,
      maxElite: character.phases.length - 1,
      maxPotential: character.potentialRanks.length + 1,
    };
  });

  fs.writeFileSync(
    path.join(DATA_DIRECTORY, "progress.json"),
    JSON.stringify(operatorProgress, null, 2)
  );

  const searchData = denormaliseOperators.map((character) => {
    return {
      id: character.id,
      name: character.name,
      profession: character.profession,
      rarity: character.rarity + 1,
    };
  });

  // Build searchable index
  const createIndex = () => {
    const index = new Index({ tokenize: "full" });
    Object.entries(searchData).forEach(([key, value]) => {
      index.add(+key, value.name);
    });

    index.export((key, data) => {
      const keyPart = key.split(".");
      fs.writeFileSync(
        path.join(
          DATA_DIRECTORY,
          `searchIndex/${keyPart[keyPart.length - 1]}.json`
        ),
        data !== undefined ? data : ""
      );
    });

    // );
  };

  createIndex();

  const cnExclusiveOperators = denormaliseOperators
    .filter((character) => character.cnExclusive)
    .map((data) => data.id);

  // const indexCfgExport = require("../data/searchIndex/reg.cfg.map.json");
  // const indexRefExport = require("../data/searchIndex/reg.json");

  fs.writeFileSync(
    path.join(DATA_DIRECTORY, "search.json"),
    JSON.stringify(
      {
        // index: JSON.stringify([indexCfgExport, indexRefExport]),
        store: searchData,
        cnExclusiveOperators,
        welfareOperators: WELFARE_OPS,
        limitedOperators: LIMITED_OPS,
      },
      null,
      2
    )
  );
})();
