import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionSupport = forwardRef<TIcon, IIcon>(
  ({ title, titleId, ...props }, svgRef) => (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden={true}
      aria-labelledby={titleId}
      {...props}
    >
      <title id={titleId}>{title}</title>
      <path
        d="M193 204h11V52h-50v16h34v105.858l-86-86V52H86v34H52v118h30v-16H68v-86h19.858l86 86H136v-28.858l-16-16V220H36V36h84v60.758l16 16V36h84v184h-84v-16h57zM52 52v26h26V52H52z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionSupport.displayName = "ProfessionSupport";
export default ProfessionSupport;
