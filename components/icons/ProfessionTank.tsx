import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionTank = forwardRef<TIcon, IIcon>(
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
        d="M128 33l25.269 17h25.269v13l25.268 11-6.064 98L128 226l-69.742-54-6.064-98 25.268-11V50h25.27L128 33zm22.237 27L128 46l-22.237 14H85.548v11L62.301 81l5.054 86L128 214l60.645-47 5.054-86-23.247-10V60h-20.215zm-26.28 61h8.086V56l16.172 11h18.194l-5.054 81L128 174l-33.355-26-5.054-81h18.194l16.172-11v65zM128 180l38.409-30 4.043-70 14.15 6-4.043 76L128 203l-52.56-41-4.042-76 14.15-6 4.043 70L128 180zM59.269 62L34 30l32.344 24-7.075 8zm0 126l7.075 8L34 220l25.269-32zM196.73 62l-7.075-8L222 30l-25.269 32zm0 126L222 220l-32.344-24 7.075-8z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionTank.displayName = "ProfessionTank";
export default ProfessionTank;
