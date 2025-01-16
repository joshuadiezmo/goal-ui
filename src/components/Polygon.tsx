import * as React from "react";
const Polygon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={7} height={7} {...props}>
    <path d="M3.575 6.075.543.825h6.063l-3.031 5.25Z" />
  </svg>
);
export default Polygon;
