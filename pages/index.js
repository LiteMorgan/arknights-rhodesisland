import { useEffect, useState } from "react";
import Head from "next/head";
import { CharacterListItem } from "../components";

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

  return { props: { operators } };
};

const HomeView = ({ operators }) => {
  const [savedData, setSavedData] = useState({});

  // const handleSearch = (ev) => {
  //   const VALUE = ev.target.value.toLowerCase();

  //   if (VALUE === "") return setCharacters(defaultCharacters);

  //   const characterData = defaultCharacters.slice(0);
  //   const results = characterData.filter((array) =>
  //     array.name.toLowerCase().includes(VALUE)
  //   );

  //   setCharacters(results);
  // };

  // const handleFilterRecruited = (ev) => {
  //   const VALUE = ev.target.value;
  //   if (VALUE === "display-all") return setCharacters(defaultCharacters);

  //   const characterData = defaultCharacters.slice(0);
  //   let results = [];
  //   if (VALUE === "display-recruited") {
  //     results = characterData.filter((array) =>
  //       Object.keys(savedData).includes(array.id)
  //     );
  //   }

  //   if (VALUE === "display-missing") {
  //     results = characterData.filter(
  //       (array) => !Object.keys(savedData).includes(array.id)
  //     );
  //   }

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

  return (
    <div>
      <Head>
        <title>Rhodes Island PRTS</title>
        <meta name="title" content="Rhodes Island PRTS" />
        <meta property="og:title" content="Rhodes Island PRTS" />
        <meta property="twitter:title" content="Rhodes Island PRTS" />
      </Head>

      <main className="relative grid grid-cols-[16rem_1fr] w-full gap-8">
        <div />
        {/* <div className="sticky block my-4 top-4 h-[calc(100vh-2rem)]">
          <input
            className="bg-slate-700 w-full py-2 px-4 box-border rounded-md"
            type="text"
            placeholder="Search"
            onChange={(ev) => handleSearch(ev)}
          />

          <div className="mt-8">
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
          </div>
        </div> */}

        <ul className="w-full">
          {operators.map((operator) => (
            <CharacterListItem
              key={operator.id}
              data={operator}
              savedData={savedData[operator.id]}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HomeView;
