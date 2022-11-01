import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionWarrior = forwardRef<TIcon, IIcon>(
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
        d="M63.268 63.268v32.843H50.417v-34.27L24 35.424 35.424 24 61.84 50.417h34.27v12.851H63.268zm159.93 159.93l-44.98-22.133-7.739-15.109L70.523 86l.208-13.058 88.532 88.532 2.211-2.21L72.942 70.73 86 70.523l99.956 99.956 15.109 7.739 22.133 44.98zm8.802-8.363l-30.291-75.728 23.223 25.243L232 97.709v117.126zM214.835 232H97.709l66.64-7.068-25.242-23.223L214.835 232z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionWarrior.displayName = "ProfessionWarrior";
export default ProfessionWarrior;
