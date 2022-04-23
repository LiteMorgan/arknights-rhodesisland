import { useEffect, useState } from "react";
import Head from "next/head";
import { CharacterListItem } from "../components";

const FILTER_LIST = {
  professions: [
    {
      name: "PIONEER",
      label: "Vanguard",
      checked: false,
    },
    {
      name: "SNIPER",
      label: "Sniper",
      checked: false,
    },
    {
      name: "CASTER",
      label: "Caster",
      checked: false,
    },
    {
      name: "MEDIC",
      label: "Medic",
      checked: false,
    },
    {
      name: "WARRIOR",
      label: "Guard",
      checked: false,
    },
    {
      name: "TANK",
      label: "Defender",
      checked: false,
    },
    {
      name: "SUPPORT",
      label: "Supporter",
      checked: false,
    },
    {
      name: "SPECIAL",
      label: "Specialist",
      checked: false,
    },
  ],
};

export const getStaticProps = async () => {
  const operatorsJson = await import("../data/operators.json");
  const operators = Object.values(operatorsJson.default).map((op) => {
    const {
      id,
      name,
      cnExclusive,
      profession,
      rarity,
      phases,
      maxElite,
      maxPotential,
      maxSkillLevel,
      skills,
    } = op;

    return {
      id,
      name,
      cnExclusive,
      profession,
      rarity,
      phases: phases.map((phase) => phase.maxLevel),
      maxElite,
      maxPotential,
      maxSkillLevel,
      skills: skills.map((skill) => skill.name),
    };
  });

  const sortOperators = Object.values(operatorsJson.default).map((op) => {
    const { id, name, rarity, profession } = op;
    return { id, name, rarity, profession };
  });

  return { props: { operators, sortOperators } };
};

const HomeView = ({ operators, sortOperators: sortValues }) => {
  const [savedData, setSavedData] = useState({});
  const [filterData, setFilterData] = useState(operators);
  const [filterList, setFilterList] = useState(FILTER_LIST);
  const [sortedOperators, setSortedOperators] = useState([]);

  const PROFESSION_SORT_ORDER = [
    "WARRIOR",
    "SNIPER",
    "TANK",
    "MEDIC",
    "SUPPORT",
    "CASTER",
    "SPECIAL",
    "PIONEER",
  ];

  const handleDataSort = (OPTION) => {
    const CLONE_DATA = sortValues.slice(0);

    let sortedData = [];
    if (OPTION === "rarity") {
      sortedData = CLONE_DATA.sort((opA, opB) => {
        if (opA.rarity < opB.rarity) return 1;
        if (opA.rarity > opB.rarity) return -1;

        if (
          PROFESSION_SORT_ORDER.indexOf(opA.profession) >
          PROFESSION_SORT_ORDER.indexOf(opB.profession)
        )
          return 1;
        if (
          PROFESSION_SORT_ORDER.indexOf(opA.profession) <
          PROFESSION_SORT_ORDER.indexOf(opB.profession)
        )
          return -1;

        if (opA.name > opB.name) return 1;
        if (opA.name < opB.name) return -1;
      });
    }

    if (OPTION === "profession") {
      sortedData = CLONE_DATA.sort((opA, opB) => {
        if (
          PROFESSION_SORT_ORDER.indexOf(opA.profession) >
          PROFESSION_SORT_ORDER.indexOf(opB.profession)
        )
          return 1;
        if (
          PROFESSION_SORT_ORDER.indexOf(opA.profession) <
          PROFESSION_SORT_ORDER.indexOf(opB.profession)
        )
          return -1;

        if (opA.rarity < opB.rarity) return 1;
        if (opA.rarity > opB.rarity) return -1;

        if (opA.name > opB.name) return 1;
        if (opA.name < opB.name) return -1;
      });
    }

    if (OPTION === "name") {
      sortedData = CLONE_DATA.sort((opA, opB) => {
        if (opA.name > opB.name) return 1;
        if (opA.name < opB.name) return -1;
      });
    }

    setSortedOperators(sortedData);
  };

  const handleDataFilter = (ev) => {
    const { name: NAME, checked: CHECKED } = ev.target;
    const newFilter = [...filterList["professions"]];
    const index = newFilter.findIndex((h) => h.name === NAME);
    if (index === -1) return;
    newFilter[index] = { ...newFilter[index], checked: CHECKED };

    setFilterList((h) => ({ ...h, ["professions"]: newFilter }));
  };

  useEffect(() => {
    const CLONE_DATA = operators.slice(0);
    let professions = [];
    for (const key in filterList.professions) {
      let item = filterList.professions[key];
      let index = professions.findIndex((h) => h === item.name);

      if (item.checked && index > -1) continue;

      if (item.checked) {
        professions.push(item.name);
        continue;
      }

      if (index === -1) continue;
      professions.splice(index, 1);
    }

    if (professions.length === 0) return setFilterData(CLONE_DATA);

    const filteredOperators = CLONE_DATA.filter((op) => {
      if (professions.length === 0) return;
      return professions.includes(op.profession);
    });

    setFilterData(filteredOperators);
  }, [filterList]);

  // const handleSearch = (ev) => {
  //   const VALUE = ev.target.value.toLowerCase();

  //   if (VALUE === "") return setCharacters(defaultCharacters);

  //   const characterData = defaultCharacters.slice(0);
  //   const results = characterData.filter((array) =>
  //     array.name.toLowerCase().includes(VALUE)
  //   );

  //   setCharacters(results);
  // };

  useEffect(() => {
    let persistedCharacterData = window.localStorage.getItem("characters");
    if (!persistedCharacterData) {
      window.localStorage.setItem("characters", JSON.stringify({}));
      persistedCharacterData = JSON.stringify({});
    }

    setSavedData(JSON.parse(persistedCharacterData));
  }, []);

  useEffect(() => {
    handleDataSort("rarity");
  }, []);

  return (
    <div>
      <Head>
        <title>Rhodes Island PRTS</title>
        <meta name="title" content="Rhodes Island PRTS" />
        <meta property="og:title" content="Rhodes Island PRTS" />
        <meta property="twitter:title" content="Rhodes Island PRTS" />
      </Head>

      <main className="relative grid grid-cols-[16rem_1fr] w-full gap-8">
        <div className="sticky block my-4 top-4 h-[calc(100vh-2rem)]">
          {/* <input
            className="bg-slate-700 w-full py-2 px-4 box-border rounded-md"
            type="text"
            placeholder="Search"
            onChange={(ev) => handleSearch(ev)}
          /> */}

          <div className="block my-8">
            <form onChange={(ev) => handleDataSort(ev.target.value)}>
              <legend>Sort</legend>
              <div>
                <input
                  type="radio"
                  name="sortData"
                  id="sortByRarity"
                  value="rarity"
                  defaultChecked
                />
                <label htmlFor="sortByRarity">Rarity</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="sortData"
                  id="sortByProfession"
                  value="profession"
                />
                <label htmlFor="sortByProfession">Profession</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="sortData"
                  id="sortByName"
                  value="name"
                />
                <label htmlFor="sortByName">Name</label>
              </div>
            </form>
          </div>

          <div className="block my-8">
            <form>
              <legend>Filter</legend>
              {filterList.professions.map((profession) => (
                <div key={profession.label}>
                  <input
                    type="checkbox"
                    name={profession.name}
                    id={`professionFilter${profession.label}`}
                    checked={profession.checked}
                    onChange={(ev) => handleDataFilter(ev)}
                  />
                  <label htmlFor={`professionFilter${profession.label}`}>
                    {profession.label}
                  </label>
                </div>
              ))}
            </form>
          </div>

          {/* <div className="mt-8">
            <form onChange={(ev) => handleFilterRecruited(ev)}>
              <input
                type="radio"
                id="display-all"
                name="display-recruits"
                value="display-all"
                defaultChecked
              />
              <label htmlFor="display-all">Show all units</label>
              <input
                type="radio"
                id="display-recruited"
                name="display-recruits"
                value="display-recruited"
              />
              <label htmlFor="display-recruited">Show recruited</label>
              <input
                type="radio"
                id="display-missing"
                name="display-recruits"
                value="display-missing"
              />
              <label htmlFor="display-missing">Show missing</label>
            </form>
          </div> */}
        </div>

        <ul className="w-full">
          {sortedOperators.map((operator) => {
            const opIndex = filterData.findIndex((op) => op.id === operator.id);

            if (opIndex === -1) return null;

            return (
              <CharacterListItem
                key={operator.id}
                data={filterData[opIndex]}
                savedData={savedData[operator.id]}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default HomeView;
