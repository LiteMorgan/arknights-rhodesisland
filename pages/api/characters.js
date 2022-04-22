import CharacterTable from "../../data/en_US/character_table.json";
import SkillTable from "../../data/en_US/skill_table.json";

const fetchCharacterData = async (req, res) => {
  const characterKeys = Object.keys(CharacterTable);

  const profession = {
    CASTER: { profession: "CASTER", sortOrder: 6 },
    MEDIC: { profession: "MEDIC", sortOrder: 4 },
    PIONEER: { profession: "VANGUARD", sortOrder: 8 },
    SNIPER: { profession: "SNIPER", sortOrder: 2 },
    SPECIAL: { profession: "SPECIALIST", sortOrder: 7 },
    SUPPORT: { profession: "SUPPORTER", sortOrder: 5 },
    TANK: { profession: "DEFENDER", sortOrder: 3 },
    WARRIOR: { profession: "GUARD", sortOrder: 1 },
  };

  const cleanData = characterKeys.map((key) => ({
    id: key,
    handle: key.split("_")[2],
    ...CharacterTable[key],
  }));

  const characterData = cleanData
    .filter((char) => !char.isNotObtainable && char.displayNumber)
    .map((character) => {
      let skillMap = [];
      for (const skill of character.skills) {
        const skillId = skill.skillId;
        if (!skillId) return;
        skillMap.push({
          ...skill,
          name: SkillTable[skillId].levels[0].name,
        });
      }

      return {
        ...character,
        ...profession[character.profession],
        maxElite: character.phases.length - 1,
        maxPotential: character.potentialRanks.length + 1,
        maxSkillLevel: character.allSkillLvlup.length + 1,
        skills: skillMap,
      };
    })

    .sort((a, b) => {
      const option = "rarity";
      // const option = sortOption.split("-")[0];
      const idA = a.name;
      const idB = b.name;

      if (a.sortOrder > b.sortOrder) return 1;
      if (a.sortOrder < b.sortOrder) return -1;

      // if (sortOption.split("-")[1] === "reverse") {
      if (a[option] < b[option]) return 1;
      if (a[option] > b[option]) return -1;
      // } else {
      // if (a[option] > b[option]) return 1;
      // if (a[option] < b[option]) return -1;
      // }

      if (idA > idB) return 1;
      if (idA < idB) return -1;
      return 0;
    });

  res.status(200).json(characterData);
};

export default fetchCharacterData;
