import { ComponentMeta } from "@storybook/react";
import { FunctionComponent } from "react";

// import Rank from "../icons/rank.svg";
// import * as IconSet from "../icons";
import { IIcon, professionIcons } from "../icons";
import Icon from "./";

const ICON_MAP = {
  ...professionIcons,
  // rank: IconSet.Rank,
};

const IconExample = ({
  component,
  title,
  titleId,
}: {
  title: string;
  titleId: string;
  component: FunctionComponent<IIcon>;
}) => {
  return (
    <div className="flex flex-col-reverse">
      <dt className="flex-initial text-center text-base">{title}</dt>
      <dd className="flex-initial text-center font-mono text-[0.625rem]">
        {titleId}
      </dd>
      <dd className="mb-2 flex-[1_0_96px]">
        <Icon component={component} title={title} titleId={titleId} />
      </dd>
    </div>
  );
};

export default {
  title: "Icons",
  component: Icon,
} as ComponentMeta<typeof Icon>;

export const Icons = () => (
  <div className="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-4">
    {Object.entries(ICON_MAP).map(([name, component]) => (
      <IconExample
        key={name}
        title={name}
        titleId={name}
        component={component}
      />
    ))}
  </div>
);
