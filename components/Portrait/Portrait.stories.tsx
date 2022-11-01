import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Sizes } from "../../utils/types";
// import UICaster from "../icons/ui-caster.svg";
import Portrait, { IProps } from "./";

export default {
  title: "Operators/Portrait",
  component: Portrait,
  argTypes: {
    className: { table: { disable: true } },
    priority: { table: { disable: true } },
    profession: {
      control: "select",
      options: [
        null,
        "pioneer",
        "sniper",
        "medic",
        "caster",
        "warrior",
        "tank",
        "support",
        "special",
      ],
    },
    rarity: {
      control: "inline-radio",
      options: [null, 1, 2, 3, 4, 5, 6],
    },
    size: {
      control: "inline-radio",
      options: Sizes,
    },
  },
} as ComponentMeta<typeof Portrait>;

const Template: ComponentStory<typeof Portrait> = (args) => (
  <div className="flex">
    <Portrait {...args} />
  </div>
);

const defaultProps: IProps = {
  id: "char_002_amiya",
  avatar: false,
  border: false,
  priority: true,
  profession: undefined,
  rarity: null,
  size: Sizes.md,
  skin: "1",
};

export const OpPortrait = Template.bind({});
OpPortrait.storyName = "Portrait";
OpPortrait.args = { ...defaultProps };

export const OpPortraitWithBorder = Template.bind({});
OpPortraitWithBorder.storyName = "Portrait w/ Border";
OpPortraitWithBorder.args = { ...defaultProps, border: true };

export const OpPortraitWithSkin = Template.bind({});
OpPortraitWithSkin.storyName = "Portrait w/ Skin";
OpPortraitWithSkin.args = { ...defaultProps, skin: "epoque#4" };

export const OpAvatar = Template.bind({});
OpAvatar.storyName = "Avatar";
OpAvatar.args = {
  ...defaultProps,
  avatar: true,
};

export const OpAvatarWithRarity = Template.bind({});
OpAvatarWithRarity.storyName = "Avatar w/ Rarity";
OpAvatarWithRarity.args = {
  ...defaultProps,
  avatar: true,
  rarity: 5,
};

export const OpAvatarWithProfession = Template.bind({});
OpAvatarWithProfession.storyName = "Avatar w/ Profession";
OpAvatarWithProfession.args = {
  ...defaultProps,
  avatar: true,
  profession: "CASTER",
};
