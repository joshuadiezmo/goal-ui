import * as React from "react";
const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={17} {...props}>
    <g clipPath="url(#a)">
      <path d="M.75 0h16.667a.75.75 0 0 1 .573 1.234L11.5 8.908v6.842a.75.75 0 0 1-1.085.671L7.081 14.75a.75.75 0 0 1-.415-.671V8.908L.177 1.234A.75.75 0 0 1 .75 0ZM15.8 1.5H2.366l5.623 6.65a.75.75 0 0 1 .177.484v4.986l1.833.917v-5.9a.75.75 0 0 1 .177-.484L15.8 1.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h18.167v16.5H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default FilterIcon;
