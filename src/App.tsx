import React from "react";
import { NavLink } from "react-router";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="p-2 flex flex-col">
      <NavLink to={"/sample1"} className={"underline"}>
        Sample1
      </NavLink>
      <NavLink to={"/sample2"} className={"underline"}>
        Sample2
      </NavLink>
      <NavLink to={"/sample3"} className={"underline"}>
        Sample3
      </NavLink>
      <NavLink to={"/sample4"} className={"underline"}>
        Sample4
      </NavLink>
      <NavLink to={"/sample5"} className={"underline"}>
        Sample5
      </NavLink>
    </div>
  );
};

export default App;
