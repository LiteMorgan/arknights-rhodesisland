import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionPioneer = forwardRef<TIcon, IIcon>(
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
        d="M131.761 85.94L158 72l-12.968 23L88 125.288V132l-11.378-.67L49 146l8.913-15.77L20 128l40.521-2.384L62 123l62.118-33H124l4-68 3.761 63.94zm59.291 44.704l-3.02 5.356-56.49 30H132l-4 68-3.772-64.116L92 187l13-23 63-33.469V124l11.069.651L201 113l-7.062 12.526L236 128l-44.948 2.644zM36 169L226.968 67 214 90 23 192l13-23z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionPioneer.displayName = "ProfessionPioneer";
export default ProfessionPioneer;
