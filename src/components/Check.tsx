// import * as React from "react";
import { SVGProps } from "react";

const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={9} {...props}>
    <path
      className="transition-all"
      d="M3.844 8.184a.688.688 0 0 1-.503-.204L.212 4.85a.702.702 0 0 1 0-1.006.702.702 0 0 1 1.007 0L3.86 6.47 10.134.212a.702.702 0 0 1 1.006 0 .702.702 0 0 1 0 1.007l-6.777 6.76a.75.75 0 0 1-.519.205Z"
    />
  </svg>
);
export default Check;
