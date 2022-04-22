import Image from "next/image";

import { Icon } from "./";

const OpAvatar = ({ id, elite, handle, profession }) => {
  const PATH = `/avatars/`;
  const EXTENSION = `.png`;

  const ELITE_IMG =
    elite === 1 && handle === "amiya" ? "_1+" : elite === 2 ? "_2" : "";

  const AVATAR_SRC = `${PATH}${id}${ELITE_IMG}${EXTENSION}`;

  return (
    <div className="relative w-[5.625rem] h-[5.625rem] bg-slate-700">
      <span className="absolute w-6 h-6 bg-gray-900 top-0 left-0 z-10 opacity-80">
        <Icon name={`ui-${profession}`} fill="#fff" />
      </span>
      <Image
        alt=""
        src={AVATAR_SRC}
        className="mb-0 !flex align-top"
        width={90}
        height={90}
        layout="intrinsic"
        quality={100}
      />
    </div>
  );
};

export default OpAvatar;
