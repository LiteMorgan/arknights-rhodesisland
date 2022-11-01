import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionMedic = forwardRef<TIcon, IIcon>(
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
        d="M113.985 120.127V26h28.03v94.127L223 167.191l-14.015 24.433L128 144.56l-80.985 47.064L33 167.19l80.985-47.064zM128 161.483l14.015 9.069V230h-28.03v-59.448L128 161.483zm-29.042-50.632l-14.81 7.682L33 88.81l14.015-24.433L98.163 94.1l.795 16.751zm58.084 0l.795-16.75 51.148-29.725L223 88.81l-51.148 29.724-14.81-7.682zM69 35.09h30v10.1H79v20.197H69V35.09zm118 0v30.297h-10V45.188h-20V35.09h30zM69 220.911v-30.297h10v20.198h20v10.099H69zm118 0h-30v-10.1h20v-20.197h10v30.297zM28 128l21-21.208 8 8.08L44 128l13 13.129-8 8.079L28 128zm200 0l-21 21.208-8-8.08L212 128l-13-13.129 8-8.079L228 128z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionMedic.displayName = "ProfessionMedic";
export default ProfessionMedic;
