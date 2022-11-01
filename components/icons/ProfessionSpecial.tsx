import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionSpecial = forwardRef<TIcon, IIcon>(
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
        d="M196.297 187l11.64 23.351L228 228l-21.675-11H49.675L28 228l18.308-16.105L69.186 166H86.27L69.38 200h116.256l-6.458-13h17.12zm-8.973-18H133.42l8.867-18h19.005l-33.784-68-23.35 47h27.291l-8.867 18H78.158l46.6-93.483L127.507 28l2.75 26.517L187.323 169z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionSpecial.displayName = "ProfessionSpecial";
export default ProfessionSpecial;
