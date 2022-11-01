import { Fragment } from "react";

import { IFavorKeyFrames, IPhases, IPotentialRanks } from "../../utils/types";
import {
  calculateStatsAtLevel,
  getPotentialStatIncreases,
  unitStatPercentages,
} from "../../utils/unitStats";

export interface IProps {
  phases: IPhases[];
  favorKeyFrames: IFavorKeyFrames[];
  potentialRanks: IPotentialRanks[];
  eliteLevel: number;
  opLevel: number;
  applyTrustBonus: boolean;
  potentialLevel: {
    value: number;
    label: number;
  };
}

const OperatorStats = ({
  phases,
  favorKeyFrames,
  potentialRanks,
  eliteLevel,
  opLevel = 1,
  applyTrustBonus,
  potentialLevel,
}: IProps) => {
  const potStatIncreases = getPotentialStatIncreases(potentialRanks);

  const statData = () => {
    const statsAtLevel = calculateStatsAtLevel(phases, favorKeyFrames, {
      eliteLevel,
      opLevel,
      trust: applyTrustBonus,
      pots: potStatIncreases,
      potLevel: potentialLevel.label,
    });

    return unitStatPercentages(statsAtLevel);
  };
  const unitStats = statData();

  return (
    <dl className="grid grid-cols-[10rem_1fr] items-center gap-2">
      {Object.keys(unitStats).map((key) => {
        const data = unitStats[key as keyof typeof unitStats];
        return (
          <Fragment key={key}>
            <dt className="text-sm leading-snug">{data.name}</dt>
            <dd className="relative flex w-full justify-end bg-slate-700 px-2 text-sm leading-snug text-white">
              <div className="absolute top-0 left-0 h-full w-[calc(100%_-_3.5rem)]">
                <span
                  className="relative left-0 top-0 inline-block h-full bg-slate-200"
                  style={{
                    width: `${
                      data.name === "Deploy Cost" ? data.core : data.base
                    }%`,
                  }}
                />
                {data.trust && (
                  <span
                    className="relative left-0 top-0 inline-block h-full bg-[#00B0FF]"
                    style={{
                      width: `${data.trust}%`,
                    }}
                  />
                )}
                {data.potential && (
                  <span
                    className={`relative left-0 top-0 inline-block h-full ${
                      key === "dpCost" ? "bg-[#FF6237]" : "bg-[#f49800]"
                    }`}
                    style={{
                      width: `${data.potential}%`,
                    }}
                  />
                )}
              </div>
              {data.value}
            </dd>
          </Fragment>
        );
      })}
    </dl>
  );
};

export default OperatorStats;
