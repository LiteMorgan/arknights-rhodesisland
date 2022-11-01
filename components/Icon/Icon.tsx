import { FunctionComponent } from "react";
import { IIcon } from "../icons";

export interface IProps {
  component: FunctionComponent<IIcon>;
  className?: string;
  title: string;
  titleId: string;
}

const Icon = ({
  component,
  className: classNameProp,
  title,
  titleId,
}: IProps) => {
  const Component = component;

  return (
    <span className={["block h-full w-full", classNameProp].join(" ")}>
      <Component title={title} titleId={titleId} />
    </span>
  );
};

export default Icon;
