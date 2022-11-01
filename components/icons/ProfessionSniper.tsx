import { forwardRef } from "react";

import { IIcon, TIcon } from "./";

const ProfessionSniper = forwardRef<TIcon, IIcon>(
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
        d="M201.736 158.928l-91.114 2.098-19.237 19.237 17.81-.715-.714 14.96-39.894 2.855-30.636 30.636-9.972-9.972 30.636-30.636 2.855-39.894 14.96-.714-.715 17.81 19.237-19.237L97.05 54.24l-9.211 5.63-4.986-4.986 31.347-19.95 66.249 16.376 8.547 8.547 11.399-4.275-4.276 11.398 8.548 8.548 16.376 66.249-19.95 31.347-4.987-4.986 5.63-9.211zm2.15-3.518l7.896-12.919-12.104-52.002-6.411-2.136-19.948 7.126-12.824 12.825-1.425-1.425-47.735 46.31-9.26.714.713-9.26 46.31-47.736-1.424-1.424 12.824-12.825 7.127-19.947-2.137-6.412-52.002-12.103-12.919 7.896L97.8 156.753l-24.224 24.224v1.425H75l24.224-24.224 104.662-2.768zM162.524 28H228v65.493l-11.08-54.41L162.523 28zM80.93 134.804l2.519-57.432 2.518 57.432H80.93zm39.286 35.265l57.418 2.52-57.418 2.518v-5.038z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
);
ProfessionSniper.displayName = "ProfessionSniper";
export default ProfessionSniper;
