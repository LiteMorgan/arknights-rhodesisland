import { useEffect, useState } from "react";
import Head from "next/head";
import { CharacterListItem } from "../components";

const HomeView = () => {
  const [characters, setCharacters] = useState([]);
  const [savedData, setSavedData] = useState({});

  useEffect(() => {
    let persistedCharacterData = window.localStorage.getItem("characters");
    if (!persistedCharacterData) {
      window.localStorage.setItem("characters", JSON.stringify({}));
      persistedCharacterData = JSON.stringify({});
    }

    setSavedData(JSON.parse(persistedCharacterData));
  }, []);

  // Fetch character data from API and save to state
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/characters").then((res) => res.json());
      setCharacters(data);
    };

    fetchData();
  }, []);

  console.log(characters);

  return (
    <div>
      <Head>
        <title>Rhodes Island PRTS</title>
        <meta name="title" content="Rhodes Island PRTS" />
        <meta property="og:title" content="Rhodes Island PRTS" />
        <meta property="twitter:title" content="Rhodes Island PRTS" />
      </Head>

      <main>
        <ul className="w-full">
          {characters.map((character) => (
            <CharacterListItem
              key={character.displayNumber}
              data={character}
              savedData={savedData[character.id]}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HomeView;
