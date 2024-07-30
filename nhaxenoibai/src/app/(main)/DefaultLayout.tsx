import GroupIcons from "@/components/GroupIcons/GroupIcons";
import React from "react";
import Header from "./components/Header/Header";
import Test from "./components/Test/Test";

const DefaultLayout = ({ children }: A) => {
  return (
    <div>
      <Header />
      <div className="mt-24 p-5">
        {children}
        <GroupIcons />
      </div>
    </div>
  );
};

export default DefaultLayout;
