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
      <div className="grid grid-cols-[6em_1fr_8rem_repeat(8,_5rem)] items-center gap-2 pr-8">
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
            maxValue={data.phases[elite] || 0}
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
              label={data.skills[0]}
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
              label={data.skills[1]}
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
              label={data.skills[2]}
              value={skill3}
              maxValue={3}
              onChange={(value) => setSkill3(value)}
              disabledRule={!recruited || elite !== 2 || skill !== 7}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default CharacterListItem;
