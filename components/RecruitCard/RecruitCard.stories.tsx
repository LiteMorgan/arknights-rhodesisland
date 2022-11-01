import { ComponentMeta, ComponentStory } from "@storybook/react";

import RecruitCard, { IProps } from "./RecruitCard";

export default {
  title: "Operators/RecruitCard",
  component: RecruitCard,
  argTypes: {
    visible: { table: { disable: true } },
  },
} as ComponentMeta<typeof RecruitCard>;

const Template: ComponentStory<typeof RecruitCard> = (args) => (
  <RecruitCard {...args} />
);

const defaultProps: IProps = {
  hideRecruit: false,
  obtained: true,
  operator: {
    id: "char_002_amiya",
    name: "Amiya",
    profession: "CASTER",
    rarity: 5,
  },
  visible: true,
};

export const Operator = Template.bind({});
Operator.args = { ...defaultProps };

export const LimitedOperator = Template.bind({});
LimitedOperator.args = {
  ...defaultProps,
  operator: {
    id: "char_1012_skadi2",
    name: "Skadi the Corrupting Heart",
    profession: "SUPPORT",
    rarity: 6,
  },
};

export const UnrecruitedOperator = Template.bind({});
UnrecruitedOperator.args = { ...defaultProps, obtained: false };

export const UnrecruitableOperator = Template.bind({});
UnrecruitableOperator.args = {
  ...defaultProps,
  hideRecruit: true,
  obtained: false,
};

export const CardGroup = (args: IProps) => (
  <ul className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-2">
    <RecruitCard {...args} {...defaultProps} />
    <RecruitCard {...args} {...defaultProps} />
    <RecruitCard {...args} {...defaultProps} obtained={false} />
    <RecruitCard {...args} {...defaultProps} />
  </ul>
);
CardGroup.parameters = {
  controls: {
    exclude: ["hideRecruit", "operator", "obtained"],
  },
};
