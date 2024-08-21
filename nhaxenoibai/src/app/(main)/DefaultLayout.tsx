import GroupIcons from "@/components/GroupIcons/GroupIcons";
import React from "react";
import Header from "./components/Header/Header";
import { Affix } from "antd";

const DefaultLayout = ({ children }: A) => {
  return (
    <div>
      <Header />
      <div className="mt-16 p-3 md:mt-16 lg:mt-24">
        {children}
        <GroupIcons />
      </div>
    </div>
  );
};

export default DefaultLayout;
