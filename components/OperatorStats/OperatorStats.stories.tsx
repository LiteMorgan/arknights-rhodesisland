import { ComponentMeta, ComponentStory } from "@storybook/react";

import OperatorStats, { IProps } from "./";

export default {
  title: "Operators/OperatorStats",
  component: OperatorStats,
  argTypes: {
    eliteLevel: {
      control: {
        type: "range",
        min: 0,
        max: 2,
      },
    },
    opLevel: {
      control: "inline-radio",
      options: [1, 50],
    },
  },
} as ComponentMeta<typeof OperatorStats>;

const Template: ComponentStory<typeof OperatorStats> = (args) => (
  <OperatorStats {...args} />
);

const defaultProps: IProps = {
  eliteLevel: 0,
  opLevel: 1,
  applyTrustBonus: false,
  potentialLevel: { label: 1, value: 0 },
  potentialRanks: [
    {
      type: 0,
      description: "Max HP +200",
      buff: {
        attributes: {
          attributeModifiers: [
            {
              attributeType: 0,
              value: 200,
            },
          ],
        },
      },
      equivalentCost: null,
    },
    {
      type: 0,
      description: "DP Cost -1",
      buff: {
        attributes: {
          attributeModifiers: [
            {
              attributeType: 4,
              value: -1,
            },
          ],
        },
      },
      equivalentCost: null,
    },
    {
      type: 0,
      description: "ATK +30",
      buff: {
        attributes: {
          attributeModifiers: [
            {
              attributeType: 1,
              value: 30,
            },
          ],
        },
      },
      equivalentCost: null,
    },
    {
      type: 0,
      description: "DP Cost -1",
      buff: {
        attributes: {
          attributeModifiers: [
            {
              attributeType: 4,
              value: -1,
            },
          ],
        },
      },
      equivalentCost: null,
    },
    {
      type: 1,
      description: "Improves Talent",
      buff: null,
      equivalentCost: null,
    },
  ],
  phases: [
    {
      characterPrefabKey: "char_002_amiya",
      rangeId: "3-6",
      maxLevel: 50,
      attributesKeyFrames: [
        {
          level: 1,
          data: {
            maxHp: 699,
            atk: 276,
            def: 48,
            magicResistance: 10,
            cost: 18,
            blockCnt: 1,
            moveSpeed: 1,
            attackSpeed: 100,
            baseAttackTime: 1.6,
            respawnTime: 70,
            hpRecoveryPerSec: 0,
            spRecoveryPerSec: 1,
            maxDeployCount: 1,
            maxDeckStackCnt: 0,
            tauntLevel: 0,
            massLevel: 0,
            baseForceLevel: 0,
            stunImmune: false,
            silenceImmune: false,
            sleepImmune: false,
            frozenImmune: false,
            levitateImmune: false,
          },
        },
        {
          level: 50,
          data: {
            maxHp: 958,
            atk: 390,
            def: 81,
            magicResistance: 10,
            cost: 18,
            blockCnt: 1,
            moveSpeed: 1,
            attackSpeed: 100,
            baseAttackTime: 1.6,
            respawnTime: 70,
            hpRecoveryPerSec: 0,
            spRecoveryPerSec: 1,
            maxDeployCount: 1,
            maxDeckStackCnt: 0,
            tauntLevel: 0,
            massLevel: 0,
            baseForceLevel: 0,
            stunImmune: false,
            silenceImmune: false,
            sleepImmune: false,
            frozenImmune: false,
            levitateImmune: false,
          },
        },
      ],
      evolveCost: null,
      range: {
        id: "3-6",
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
    },
    {
      characterPrefabKey: "char_002_amiya",
      rangeId: "3-1",
      maxLevel: 70,
      attributesKeyFrames: [
        {
          level: 1,
          data: {
            maxHp: 958,
            atk: 390,
            def: 81,
            magicResistance: 15,
            cost: 20,
            blockCnt: 1,
            moveSpeed: 1,
            attackSpeed: 100,
            baseAttackTime: 1.6,
            respawnTime: 70,
            hpRecoveryPerSec: 0,
            spRecoveryPerSec: 1,
            maxDeployCount: 1,
            maxDeckStackCnt: 0,
            tauntLevel: 0,
            massLevel: 0,
            baseForceLevel: 0,
            stunImmune: false,
            silenceImmune: false,
            sleepImmune: false,
            frozenImmune: false,
            levitateImmune: false,
          },
        },
        {
          level: 70,
          data: {
            maxHp: 1198,
            atk: 514,
            def: 110,
            magicResistance: 15,
            cost: 20,
            blockCnt: 1,
            moveSpeed: 1,
            attackSpeed: 100,
            baseAttackTime: 1.6,
            respawnTime: 70,
            hpRecoveryPerSec: 0,
            spRecoveryPerSec: 1,
            maxDeployCount: 1,
            maxDeckStackCnt: 0,
            tauntLevel: 0,
            massLevel: 0,
            baseForceLevel: 0,
            stunImmune: false,
            silenceImmune: false,
            sleepImmune: false,
            frozenImmune: false,
            levitateImmune: false,
          },
        },
      ],
      evolveCost: [
        {
          id: "3251",
          count: 3,
          type: "MATERIAL",
        },
        {
          id: "30062",
          count: 4,
          type: "MATERIAL",
        },
        {
          id: "30042",
          count: 4,
          type: "MATERIAL",
        },
      ],
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
    },
    {
      characterPrefabKey: "char_002_amiya",
      rangeId: "3-1",
      maxLevel: 80,
      attributesKeyFrames: [
        {
          level: 1,
          data: {
            maxHp: 1198,
            atk: 514,
            def: 110,
            magicResistance: 20,
            cost: 20,
            blockCnt: 1,
            moveSpeed: 1,
            attackSpeed: 100,
            baseAttackTime: 1.6,
            respawnTime: 70,
            hpRecoveryPerSec: 0,
            spRecoveryPerSec: 1,
            maxDeployCount: 1,
            maxDeckStackCnt: 0,
            tauntLevel: 0,
            massLevel: 0,
            baseForceLevel: 0,
            stunImmune: false,
            silenceImmune: false,
            sleepImmune: false,
            frozenImmune: false,
            levitateImmune: false,
          },
        },
        {
          level: 80,
          data: {
            maxHp: 1480,
            atk: 612,
            def: 121,
            magicResistance: 20,
            cost: 20,
            blockCnt: 1,
            moveSpeed: 1,
            attackSpeed: 100,
            baseAttackTime: 1.6,
            respawnTime: 70,
            hpRecoveryPerSec: 0,
            spRecoveryPerSec: 1,
            maxDeployCount: 1,
            maxDeckStackCnt: 0,
            tauntLevel: 0,
            massLevel: 0,
            baseForceLevel: 0,
            stunImmune: false,
            silenceImmune: false,
            sleepImmune: false,
            frozenImmune: false,
            levitateImmune: false,
          },
        },
      ],
      evolveCost: [
        {
          id: "3253",
          count: 3,
          type: "MATERIAL",
        },
        {
          id: "30014",
          count: 10,
          type: "MATERIAL",
        },
        {
          id: "30073",
          count: 10,
          type: "MATERIAL",
        },
      ],
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
    },
  ],
  favorKeyFrames: [
    {
      level: 0,
      data: {
        maxHp: 0,
        atk: 0,
        def: 0,
        magicResistance: 0,
        cost: 0,
        blockCnt: 0,
        moveSpeed: 0,
        attackSpeed: 0,
        baseAttackTime: 0,
        respawnTime: 0,
        hpRecoveryPerSec: 0,
        spRecoveryPerSec: 0,
        maxDeployCount: 0,
        maxDeckStackCnt: 0,
        tauntLevel: 0,
        massLevel: 0,
        baseForceLevel: 0,
        stunImmune: false,
        silenceImmune: false,
        sleepImmune: false,
        frozenImmune: false,
        levitateImmune: false,
      },
    },
    {
      level: 50,
      data: {
        maxHp: 200,
        atk: 70,
        def: 0,
        magicResistance: 0,
        cost: 0,
        blockCnt: 0,
        moveSpeed: 0,
        attackSpeed: 0,
        baseAttackTime: 0,
        respawnTime: 0,
        hpRecoveryPerSec: 0,
        spRecoveryPerSec: 0,
        maxDeployCount: 0,
        maxDeckStackCnt: 0,
        tauntLevel: 0,
        massLevel: 0,
        baseForceLevel: 0,
        stunImmune: false,
        silenceImmune: false,
        sleepImmune: false,
        frozenImmune: false,
        levitateImmune: false,
      },
    },
  ],
};

export const Stats = Template.bind({});
Stats.args = { ...defaultProps };

export const PotentialBonus = Template.bind({});
PotentialBonus.args = {
  ...defaultProps,
  potentialLevel: { label: 6, value: 5 },
};

export const TrustBonus = Template.bind({});
TrustBonus.args = { ...defaultProps, applyTrustBonus: true };
