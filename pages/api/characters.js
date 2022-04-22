// import CharacterTableEN from "../../data/en_US/character_table.json";
// import CharacterTableCN from "../../data/zh_CN/character_table.json";
// import SkillTableEN from "../../data/en_US/skill_table.json";
// import SkillTableCN from "../../data/zh_CN/skill_table.json";

// const PROFESSION_LOOKUP = {
//   CASTER: "Caster",
//   MEDIC: "Medic",
//   PIONEER: "Vanguard",
//   SNIPER: "Sniper",
//   SPECIAL: "Specialist",
//   SUPPORT: "Supporter",
//   TANK: "Defender",
//   WARRIOR: "Guard",
// };

// const PROFESSION_SORT_ORDER = [
//   "Guard",
//   "Sniper",
//   "Defender",
//   "Medic",
//   "Supporter",
//   "Caster",
//   "Specialist",
//   "Vanguard",
// ];

// const fetchCharacterData = async (req, res) => {
//   const enCharacterIds = new Set(Object.keys(CharacterTableEN));
//   console.log(enCharacterIds);
//   const characterKeys = Object.keys(CharacterTableEN);

//   const characterList = [...Object.entries(CharacterTableEN)]
//     .filter(
//       ([_, character]) =>
//         character.profession !== "TRAP" && !character.isNotObtainable
//     )
//     .filter(([_, character]) => character.profession !== "TOKEN")
//     .map(([charId, character], i) => {
//       return {
//         ...character,
//         id: charId,
//         profession: PROFESSION_LOOKUP[character.profession],
//         maxElite: character.phases.length - 1,
//         maxPotential: character.potentialRanks.length + 1,
//         maxSkillLevel: character.allSkillLvlup.length + 1,
//         fileIndex: i,
//       };
//     })
//     .sort((charA, charB) => {
//       return charB.fileIndex - charA.fileIndex;
//       // return charB.rarity - charA.rarity || charB.fileIndex - charA.fileIndex;
//     });

//   console.log(characterList);

//   // const cleanData = characterKeys.map((key) => ({
//   //   id: key,
//   //   handle: key.split("_")[2],
//   //   ...CharacterTableEN[key],
//   // }));

//   // const characterData = cleanData
//   //   .filter((char) => !char.isNotObtainable && char.displayNumber)
//   //   .map((character) => {
//   //     let skillMap = [];
//   //     for (const skill of character.skills) {
//   //       const skillId = skill.skillId;
//   //       if (!skillId) return;
//   //       skillMap.push({
//   //         ...skill,
//   //         name: SkillTableEN[skillId].levels[0].name,
//   //       });
//   //     }

//   //     return {
//   //       ...character,
//   //       ...profession[character.profession],
//   //       maxElite: character.phases.length - 1,
//   //       maxPotential: character.potentialRanks.length + 1,
//   //       maxSkillLevel: character.allSkillLvlup.length + 1,
//   //       skills: skillMap,
//   //     };
//   //   })

//   //   .sort((a, b) => {
//   //     const option = "rarity";
//   //     // const option = sortOption.split("-")[0];
//   //     const idA = a.name;
//   //     const idB = b.name;

//   //     if (a.sortOrder > b.sortOrder) return 1;
//   //     if (a.sortOrder < b.sortOrder) return -1;

//   //     // if (sortOption.split("-")[1] === "reverse") {
//   //     if (a[option] < b[option]) return 1;
//   //     if (a[option] > b[option]) return -1;
//   //     // } else {
//   //     // if (a[option] > b[option]) return 1;
//   //     // if (a[option] < b[option]) return -1;
//   //     // }

//   //     if (idA > idB) return 1;
//   //     if (idA < idB) return -1;
//   //     return 0;
//   //   });

//   res.status(200).json(characterList);
// };

// export default fetchCharacterData;
