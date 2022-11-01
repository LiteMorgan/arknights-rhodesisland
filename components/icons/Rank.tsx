import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const RankIcon = forwardRef<TIcon, IIcon>(
  ({ title, titleId, ...props }, svgRef) => (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden={true}
      aria-labelledby={titleId}
      {...props}
    >
      <title id={titleId}>{title}</title>
      <path
        d="M6.97 12.216l-6.882 2.36L4.2 8.97 0 3.426l6.649 2.07L11.112 0l.24 6.96L18 9.03l-6.8 2.12-.112 6.85z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
RankIcon.displayName = "RankIcon";
export default RankIcon;
