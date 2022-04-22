import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { Icon, OpAvatar } from "./";

const RarityIcon = ({ level, rarityLevel }) => {
  let isFirst = rarityLevel === 0;
  let isSecond = rarityLevel === 1;
  let isThird = rarityLevel === 2;
  let isFourth = rarityLevel === 3;
  let isFifth = rarityLevel === 4;
  let isSixth = rarityLevel === 5;
  return (
    <div
      className={[
        `block relative w-[1.125rem] h-[1.125rem] -ml-[0.1rem] first-of-type:ml-0`,
        isFirst ? "z-10" : "",
        isSecond ? "z-[9]" : "",
        isThird ? "z-[8]" : "",
        isFourth ? "z-[7]" : "",
        isFifth ? "z-[6]" : "",
        isSecond ? "z-[5]" : "",
      ]
        .join(" ")
        .replace("     ", " ")}
    >
      <Icon
        fill="currentColor"
        name="ui-rank"
        className={
          level >= rarityLevel
            ? "drop-shadow-[4px_0_4px_rgba(0,0,0,0.8)] text-stars"
            : "text-gray-600"
        }
      />
    </div>
  );
};

const InputField = ({
  value: valueProp = 0,
  disabledRule = false,
  id: idProp,
  label: labelProp,
  minValue = 0,
  maxValue,
  onChange: onChangeProp = () => {},
}) => {
  const handleChange = (ev) => {
    const VALUE = ev.target.value;
    onChangeProp(parseInt(VALUE));
  };

  const handleBlur = (ev) => {
    const VALUE = ev.target.value;
    const MIN = ev.target.min;
    const MAX = ev.target.max;

    if (VALUE < MIN) onChangeProp(parseInt(MIN));
    if (VALUE > MAX) onChangeProp(parseInt(MAX));
  };

  return (
    <div>
      <label
        className="text-xs overflow-hidden text-ellipsis block whitespace-nowrap"
        htmlFor={idProp}
      >
        {labelProp}
      </label>
      <input
        type="number"
        id={idProp}
        className="bg-slate-700 text-center appearance-none block w-full disabled:opacity-50"
        value={valueProp}
        min={minValue}
        max={maxValue}
        disabled={disabledRule}
        onChange={(ev) => handleChange(ev)}
        onBlur={(ev) => handleBlur(ev)}
      />
    </div>
  );
};

const CharacterListItem = ({ data, savedData = [] }) => {
  const [recruited, setRecruited] = useState(savedData[0] || false);
  const [elite, setElite] = useState(savedData[1] || 0);
  const [level, setLevel] = useState(savedData[2] || 1);
  const [potential, setPotential] = useState(savedData[3] || 1);
  const [trust, setTrust] = useState(savedData[4] || 0);
  const [skill, setSkill] = useState(savedData[5] || 1);
  const [skill1, setSkill1] = useState(savedData[6] || 0);
  const [skill2, setSkill2] = useState(savedData[7] || 0);
  const [skill3, setSkill3] = useState(savedData[8] || 0);

  // If `elite` changes, reset `level` to `0`.
  useEffect(() => {
    if (elite === 0) return;
    if (elite === savedData[1]) return;
    setLevel(1);
  }, [elite]);

  useEffect(() => {
    const dataOrder = [
      recruited,
      elite,
      level,
      potential,
      trust,
      skill,
      skill1,
      skill2,
      skill3,
    ];

    if (isEqual(dataOrder, savedData)) return;
    if (isEqual(dataOrder, [false, 0, 1, 1, 0, 1, 0, 0, 0])) return;

    const persistedCharacterData = JSON.parse(
      window.localStorage.getItem("characters")
    );
    const newLocalData = {
      ...persistedCharacterData,
      [data.id]: dataOrder,
    };

    window.localStorage.setItem("characters", JSON.stringify(newLocalData));
  }, [
    recruited,
    elite,
    level,
    potential,
    trust,
    skill,
    skill1,
    skill2,
    skill3,
  ]);

  return (
    <li className="my-4 box-border w-full overflow-hidden bg-slate-800 rounded-md">
      <div className="grid grid-cols-[6em_1fr_8rem_repeat(8,_6rem)] items-center gap-2 pr-8">
        <OpAvatar
          id={data.id}
          profession={data.profession.toLowerCase()}
          handle={data.handle}
          elite={elite}
        />

        <div>
          <span className="block text-xs uppercase text-gray-400 leading-none">
            {data.displayNumber} /{" "}
            {data.id.replace("char_", "").replace(`_${data.handle}`, "")} /{" "}
            {data.handle}
          </span>
          <span className="block text-2xl font-bold leading-6 mt-1 mb-2 text-gray-50">
            {data.name}
          </span>
          <div className="flex flex-row w-full text-stars">
            <RarityIcon level={data.rarity} rarityLevel={0} />
            <RarityIcon level={data.rarity} rarityLevel={1} />
            <RarityIcon level={data.rarity} rarityLevel={2} />
            <RarityIcon level={data.rarity} rarityLevel={3} />
            <RarityIcon level={data.rarity} rarityLevel={4} />
            <RarityIcon level={data.rarity} rarityLevel={5} />
          </div>
        </div>

        {/* <div className="relative block">
          <div className="block bg-gray-900 text-white w-16 h-16 p-1">
            <Icon
              fill="currentColor"
              name={`ui-${data.profession.toLowerCase()}`}
              alt={data.profession}
            />
          </div>
        </div> */}
        <div className="flex items-center">
          <label className="mr-4" htmlFor={`own-${data.displayNumber}`}>
            Recruited
          </label>
          <input
            type="checkbox"
            id={`own-${data.displayNumber}`}
            checked={recruited}
            onChange={() => setRecruited(!recruited)}
          />
        </div>

        <div>
          <InputField
            id={`elite-${data.displayNumber}`}
            label="Elite lvl."
            value={elite}
            maxValue={data.maxElite}
            onChange={(value) => setElite(value)}
            disabledRule={!recruited || data.maxElite === 0}
          />
        </div>

        <div>
          <InputField
            id={`level-${data.displayNumber}`}
            label="Level"
            value={level}
            minValue={1}
            maxValue={data.phases[elite]?.maxLevel}
            onChange={(value) => setLevel(value)}
            disabledRule={!recruited}
          />
        </div>

        <div>
          <InputField
            id={`potential-${data.displayNumber}`}
            label="Potential"
            value={potential}
            minValue={1}
            maxValue={data.maxPotential}
            onChange={(value) => setPotential(value)}
            disabledRule={!recruited || data.maxPotential === 1}
          />
        </div>

        <div>
          <InputField
            id={`potential-${data.displayNumber}`}
            label="Trust"
            value={trust}
            minValue={0}
            maxValue={200}
            onChange={(value) => setTrust(value)}
            disabledRule={!recruited}
          />
        </div>

        <div>
          <InputField
            id={`skill-${data.displayNumber}`}
            label="Skill lvl."
            value={skill}
            minValue={1}
            maxValue={data.maxSkillLevel}
            onChange={(value) => setSkill(value)}
            disabledRule={!recruited || data.maxSkillLevel === 1}
          />
        </div>

        <div>
          {data.skills[0] && (
            <InputField
              id={`skill-1-${data.displayNumber}`}
              label={data.skills[0].name}
              value={skill1}
              maxValue={3}
              onChange={(value) => setSkill1(value)}
              disabledRule={!recruited || elite !== 2 || skill !== 7}
            />
          )}
        </div>

        <div>
          {data.skills[1] && (
            <InputField
              id={`skill-2-${data.displayNumber}`}
              label={data.skills[1].name}
              value={skill2}
              maxValue={3}
              onChange={(value) => setSkill2(value)}
              disabledRule={!recruited || elite !== 2 || skill !== 7}
            />
          )}
        </div>

        <div>
          {data.skills[2] && (
            <InputField
              id={`skill-3-${data.displayNumber}`}
              label={data.skills[2].name}
              value={skill3}
              maxValue={3}
              onChange={(value) => setSkill3(value)}
              disabledRule={!recruited || elite !== 2 || skill !== 7}
            />
          )}
        </div>

        {/* <div className="relative flex items-center justify-center">
          <span className=" w-4/6 h-20 bg-gray-900 block absolute mx-auto z-0" />
          <div
            className="w-16 h-16 block cursor-pointer z-10"
            onClick={() => {
              if (elite === data.phases.length - 1) return;
              setElite(elite + 1);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              if (elite === 0) return;
              setElite(elite === 0 ? null : elite - 1);
            }}
          >
            <Icon name={`ui-elite-${elite}`} fill="#ffffff" />
          </div>
        </div> */}

        {/* <div className="relative flex items-center justify-center">
          <span className="w-16 h-16 bg-gray-900 block absolute mx-auto z-0" />
          <div
            className="absolute block w-20 h-20 cursor-pointer"
            onClick={() => {
              if (potential === 5) return;
              setPotential(potential === 5 ? null : potential + 1);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              if (potential === 0) return;
              setPotential(potential === 0 ? null : potential - 1);
            }}
          >
            <svg
              className="potential-icon absolute block w-full h-full"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="backdrop"
                fill={potential === 5 ? "#3ea9f4" : "#808080"}
                d="M101.398 112.128l11.303 34.787h36.521l11.244-34.605-29.659-21.55-29.41 21.368zm-7.322-22.535l17.561-12.76-28.415-20.645 10.854 33.405zm-41.092 57.71l-10.297 7.48L1 157.217l73.906-53.696-2.648-8.15 10.364-39.617-10.815-7.858L56.612 9l74.195 53.906 7.293-5.299 40.916-2.387 4.154-12.786 32.296-26.47-28.508 87.738 6.754 4.907 14.965 38.306h13.168L257 169.451h-91.405l-2.496 7.683-32.045 26.265 4.14 12.743-10.569 40.399-28.297-87.09h-8.793l-34.55-22.148zm.533-.388h35.489l-6.778-20.86-28.711 20.86zm96.46-70.082l17.812 12.941 11.008-33.88-28.82 20.94zm22.94 70.082h35.18l-28.461-20.678-6.719 20.678zm-41.955 56.201l10.938-33.665h-21.877l10.939 33.665z"
                fillRule="nonzero"
              />
              <path
                id="potential0"
                fill="#ffffff"
                d="M51.684 137.432h168.87l35.031 22.456H86.715z"
                fillRule="nonzero"
              />
              <path
                id="potential1"
                fill={
                  potential === 1
                    ? "#3ea9f4"
                    : potential > 1
                    ? "#fff"
                    : "transparent"
                }
                d="M.484 147.696l136.618-99.26 41.541-2.423-136.619 99.26z"
                fillRule="nonzero"
              />
              <path
                id="potential2"
                fill={
                  potential === 2
                    ? "#3ea9f4"
                    : potential > 2
                    ? "#fff"
                    : "transparent"
                }
                d="M129.831 193.922l52.184-160.605 32.182-26.378-52.184 160.605z"
                fillRule="nonzero"
              />
              <path
                id="potential3"
                fill={
                  potential === 3
                    ? "#3ea9f4"
                    : potential > 3
                    ? "#fff"
                    : "transparent"
                }
                d="M82.023 45.81l52.184 160.606-10.532 40.256L71.491 86.067z"
                fillRule="nonzero"
              />
              <path
                id="potential4"
                fill={
                  potential === 4
                    ? "#3ea9f4"
                    : potential > 4
                    ? "#fff"
                    : "transparent"
                }
                d="M55.9 0l136.62 99.26 15.141 38.758-136.619-99.26z"
                fillRule="nonzero"
              />
            </svg>
          </div>
        </div> */}
      </div>
    </li>
  );
};

export default CharacterListItem;
