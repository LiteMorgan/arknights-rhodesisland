import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionCaster = forwardRef<TIcon, IIcon>(
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
        d="M222.154 232l-8.56-7.148-.713-2.144-55.636-55.753-10.7-6.433-11.412-11.436 2.14-2.144L84.49 94.048V66.887l12.125 12.15v11.437l48.504 48.605 2.14-2.144 11.412 11.436 6.42 10.722 55.636 55.752 2.14.715 7.133 8.577-7.846 7.863zM79.497 91.904H45.259L26.713 73.32V37.58l10.7-10.72 7.132 7.147-7.846 7.862v27.162l12.84 12.866h29.958v10.007zM42.406 43.299h21.398l11.413 11.436V76.18H53.818L42.406 64.742V43.3zM26 85.471l29.245 29.306-22.469-6.79L26 181.25V85.47zM58.811 24h95.58L81.28 30.79l6.776 22.516L58.81 24z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionCaster.displayName = "ProfessionCaster";
export default ProfessionCaster;
