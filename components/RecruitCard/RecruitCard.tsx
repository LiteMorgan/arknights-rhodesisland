import clsx from "clsx";
import Link from "next/link";
import { useContext } from "react";

import UserContext from "../../context/UserContext";
import { slugifyOpName } from "../../utils/globals";
import { Sizes } from "../../utils/types";
import Icon from "../Icon";
import { Rank } from "../icons";
import Portrait from "../Portrait";

export interface ICardOperator {
  id: string;
  name: string;
  profession: string;
  rarity: number;
}

export interface IProps {
  hideRecruit: boolean;
  obtained: boolean;
  operator: ICardOperator;
  visible: boolean;
}

const RecruitCard = ({
  hideRecruit = false,
  obtained = false,
  operator,
  visible = false,
}: IProps) => {
  const { setProgressData } = useContext(UserContext);

  const name = operator.name.split(" the ")[0];
  const extendedName = operator.name.split(" the ");

  return (
    <li
      className={clsx(
        `flex items-center`,
        `transition-all hover:bg-gray-700 hover:text-slate-200 hover:opacity-100`,
        obtained
          ? "bg-gray-800 text-slate-200"
          : "bg-gray-800 text-slate-400 opacity-50"
      )}
      style={visible ? {} : { display: "none" }}
    >
      <Portrait
        id={operator.id}
        rarity={operator.rarity}
        // profession={operator.profession.toLowerCase()}
        skin={"1"}
        size={Sizes.sm}
        avatar
      />

      <div className="flex w-full items-center gap-2 px-4 text-sm">
        <Link href={`/operators/inspector/${slugifyOpName(operator.name)}`}>
          <a>
            <h3 className={`font-bold leading-6`}>
              {name}
              {extendedName.length > 1 && (
                <span className={`font-normal leading-none opacity-80`}>
                  {` `}the {extendedName[1]}
                </span>
              )}
            </h3>
          </a>
        </Link>

        <div className="flex items-center gap-1 opacity-60">
          {operator.rarity}
          <div className="inline-block h-3 w-3">
            <Icon component={Rank} title="Rank" titleId="rank" />
          </div>
        </div>

        {!hideRecruit && (
          <div className="ml-auto flex items-center">
            <label className="">
              <input
                type="checkbox"
                checked={obtained}
                onChange={() =>
                  setProgressData(operator.id, { recruited: !obtained })
                }
              />
            </label>
          </div>
        )}
      </div>
    </li>
  );
};

export default RecruitCard;
