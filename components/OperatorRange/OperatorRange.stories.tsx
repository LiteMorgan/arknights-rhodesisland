import { ComponentMeta, ComponentStory } from "@storybook/react";

import OperatorRange from "./OperatorRange";

export default {
  title: "Operators/OperatorRange",
  component: OperatorRange,
  argTypes: {
    // visible: { table: { disable: true } },
  },
} as ComponentMeta<typeof OperatorRange>;

const Template: ComponentStory<typeof OperatorRange> = (args) => (
  <OperatorRange {...args} />
);

export const Range = Template.bind({});
Range.args = {
  range: {
    id: "3-1",
    direction: 1,
    grids: [
      {
        row: 1,
        col: 0,
      },
      {
        row: 1,
        col: 1,
      },
      {
        row: 1,
        col: 2,
      },
      {
        row: 0,
        col: 0,
      },
      {
        row: 0,
        col: 1,
      },
      {
        row: 0,
        col: 2,
      },
      {
        row: 0,
        col: 3,
      },
      {
        row: -1,
        col: 0,
      },
      {
        row: -1,
        col: 1,
      },
      {
        row: -1,
        col: 2,
      },
    ],
  },
};

export const Horn = Template.bind({});
Horn.args = {
  range: {
    id: "4-5",
    direction: 1,
    grids: [
      {
        row: 1,
        col: 3,
      },
      {
        row: 1,
        col: 4,
      },
      {
        row: 0,
        col: 3,
      },
      {
        row: 0,
        col: 4,
      },
      {
        row: -1,
        col: 3,
      },
      {
        row: -1,
        col: 4,
      },
    ],
  },
};
