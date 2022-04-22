import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const characterTableEN = require("./ArknightsGameData/en_US/gamedata/excel/character_table.json");
const characterTableCN = require("./ArknightsGameData/zh_CN/gamedata/excel/character_table.json");
const skillTableEN = require("./ArknightsGameData/en_US/gamedata/excel/skill_table.json");
const skillTableCN = require("./ArknightsGameData/zh_CN/gamedata/excel/skill_table.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIRECTORY = path.join(__dirname, "../data");
fs.mkdirSync(DATA_DIRECTORY, { recursive: true });

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

  // console.log(operatorsData);

  // console.log(denormaliseCharacters);
})();
