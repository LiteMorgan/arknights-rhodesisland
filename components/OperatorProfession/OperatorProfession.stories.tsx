import { ComponentMeta, ComponentStory } from "@storybook/react";

import OperatorProfession, { IProps } from "./OperatorProfession";

export default {
  title: "Operators/OperatorProfession",
  component: OperatorProfession,
  argTypes: {
    id: {
      control: "select",
      options: [
        "PIONEER",
        "SNIPER",
        "MEDIC",
        "CASTER",
        "WARRIOR",
        "TANK",
        "SUPPORT",
        "SPECIAL",
      ],
    },
  },
} as ComponentMeta<typeof OperatorProfession>;

const Template: ComponentStory<typeof OperatorProfession> = (args) => (
  <OperatorProfession {...args} />
);

const defaultProps: IProps = {
  id: "CASTER",
  subId: "corecaster",
};

export const Profession = Template.bind({});
Profession.args = { ...defaultProps };
