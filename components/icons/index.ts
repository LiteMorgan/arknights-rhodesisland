export type TIcon = SVGSVGElement;

export interface IIcon {
  title: string;
  titleId: string;
}

import { FunctionComponent } from "react";
import { default as ProfessionCaster } from "./ProfessionCaster";
import { default as ProfessionMedic } from "./ProfessionMedic";
import { default as ProfessionPioneer } from "./ProfessionPioneer";
import { default as ProfessionSniper } from "./ProfessionSniper";
import { default as ProfessionSpecial } from "./ProfessionSpecial";
import { default as ProfessionSupport } from "./ProfessionSupport";
import { default as ProfessionTank } from "./ProfessionTank";
import { default as ProfessionWarrior } from "./ProfessionWarrior";
export { default as Rank } from "./Rank";

export const professionIcons: { [key: string]: FunctionComponent<IIcon> } = {
  "profession-caster": ProfessionCaster,
  "profession-medic": ProfessionMedic,
  "profession-pioneer": ProfessionPioneer,
  "profession-sniper": ProfessionSniper,
  "profession-special": ProfessionSpecial,
  "profession-support": ProfessionSupport,
  "profession-tank": ProfessionTank,
  "profession-warrior": ProfessionWarrior,
};
