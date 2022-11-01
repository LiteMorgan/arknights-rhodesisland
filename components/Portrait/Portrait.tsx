import clsx from "clsx";
import Image from "next/image";

import { Sizes } from "../../utils/types";
import Icon from "../Icon";
import { professionIcons } from "../icons";
const AVATAR_PATH = `/images/avatars`;
const AVATAR_SIZE = [180];
const PORTRAIT_PATH = `/images/portraits`;
const PORTRAIT_SIZE = [180, 360];
const RARITY_GRADIENT: { [key: number]: string } = {
  6: "bg-gradient-to-br from-red-300 via-orange-300 to-green-300",
  5: "bg-yellow-400",
  4: "bg-rarity4",
  3: "bg-rarity3",
  2: "bg-rarity2",
  1: "bg-rarity1",
};

export interface IProps {
  avatar?: boolean;
  border?: boolean;
  className?: string;
  id: string;
  skin: number | string;
  size?: Sizes;
  priority?: boolean;
  profession?: string;
  rarity?: number | null;
}

const Portrait = ({
  avatar = false,
  border = false,
  className: classNameProp,
  id,
  skin = 1,
  size,
  priority: priorityProp = false,
  profession,
  rarity,
}: IProps) => {
  const ELITE_IMG =
    skin === "1" && avatar ? "" : `_${encodeURIComponent(skin)}`;

  return (
    <div
      className={clsx(
        "relative flex overflow-hidden",
        avatar ? "avatar" : "portrait",
        border && "portrait-border",
        size === Sizes.sm && "flex-[0_1_96px] text-[0.5rem]",
        rarity ? RARITY_GRADIENT[rarity] : "bg-slate-700",
        classNameProp
      )}
    >
      <Image
        alt=""
        className="mb-0 !flex align-top"
        src={`${avatar ? AVATAR_PATH : PORTRAIT_PATH}/${id}${ELITE_IMG}.png`}
        width={avatar ? AVATAR_SIZE[0] : PORTRAIT_SIZE[0]}
        height={avatar ? AVATAR_SIZE[0] : PORTRAIT_SIZE[1]}
        layout="intrinsic"
        quality={100}
        priority={priorityProp}
      />
      {profession && (
        <span
          className={clsx(
            "absolute top-0 left-0 z-10 block h-12 w-12 bg-gray-900/75 text-white",
            size === Sizes.sm && "origin-top-left scale-50"
          )}
        >
          <Icon
            component={
              professionIcons[`profession-${profession.toLowerCase()}`]
            }
            title={profession}
            titleId={profession}
          />
        </span>
      )}
    </div>
  );
};

export default Portrait;
