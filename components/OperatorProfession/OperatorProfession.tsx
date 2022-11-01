import Image from "next/image";

import _subProfessions from "../../data/subProfessions.json";
import { PROFESSION_REFERENCE } from "../../utils/globals";
import Icon from "../Icon";
import { professionIcons } from "../icons";
import Tooltip from "../Tooltip";

export interface IProps {
  id: string;
  subId: string;
}

interface ISubProfession {
  name: string | null;
  cnName: string;
  category: number;
  desc: string;
}

type TSubProfessions = typeof _subProfessions;

const OperatorProfession = ({ id, subId }: IProps) => {
  const subProfession: ISubProfession =
    _subProfessions[subId as keyof TSubProfessions];

  return (
    <section className="flex-initial">
      <h2>Profession</h2>
      <div className="flex gap-4">
        <div className="relative flex">
          <div className="z-20 h-16 w-16 rounded-md bg-slate-700 p-1 text-white">
            <Icon
              component={professionIcons[`profession-${id.toLowerCase()}`]}
              title={id}
              titleId={id}
            />
          </div>

          <div className="relative z-10 h-16 w-16 rounded-r-md bg-slate-800 p-2 text-white before:absolute before:-left-4 before:top-0 before:h-16 before:w-4 before:bg-slate-800">
            <Image
              className=""
              src={`/images/subprofessions/sub_${subId.toLowerCase()}_icon.png`}
              alt=""
              width="48"
              height="48"
              objectFit="cover"
              layout="fixed"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-base leading-none">
            {PROFESSION_REFERENCE[id]}{" "}
          </p>

          <Tooltip message={subProfession.desc}>
            <p className="mb-1 text-sm leading-none">
              {subProfession.name ?? subProfession.cnName}
            </p>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default OperatorProfession;
