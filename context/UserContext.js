import { createContext, useEffect, useState } from "react";
import { isEmpty } from "lodash";

import { DEFAULT_OPERATOR_PROGRESS, mapProgressValues } from "../utils/globals";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [progressData, rawSetProgressData] = useState({});
  const [userOperatorIds, setUserOperatorsIds] = useState([]);

  const setProgressData = (operatorId, options) => {
    const savedOperatorProgress =
      progressData[operatorId] || DEFAULT_OPERATOR_PROGRESS;
    const response = mapProgressValues(options);
    const updatedStats = response.map((n, i) =>
      n === undefined ? savedOperatorProgress[i] : n
    );

    rawSetProgressData((data) => ({ ...data, [operatorId]: updatedStats }));
  };

  useEffect(() => {
    let persistedCharacterData = window.localStorage.getItem(
      "userCharacterProgress"
    );
    if (!persistedCharacterData) {
      window.localStorage.setItem("userCharacterProgress", JSON.stringify({}));
      persistedCharacterData = JSON.stringify({});
    }

    rawSetProgressData(JSON.parse(persistedCharacterData));
  }, []);

  useEffect(() => {
    if (isEmpty(progressData)) return;

    const ownedIds = Object.keys(progressData)
      .map((key) => {
        if (!progressData[key][0]) return null;
        return key;
      })
      .filter((o) => o);

    setUserOperatorsIds(ownedIds);
  }, [progressData]);

  useEffect(() => {
    if (isEmpty(progressData)) return;
    const progressDataString = JSON.stringify(progressData);
    if (
      progressDataString ===
      window.localStorage.getItem("userCharacterProgress")
    )
      return;

    window.localStorage.setItem("userCharacterProgress", progressDataString);
    console.log("Saved Character Data", progressData);
  }, [progressData]);

  return (
    <UserContext.Provider
      value={{
        progressData,
        userOperatorIds,
        setProgressData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
