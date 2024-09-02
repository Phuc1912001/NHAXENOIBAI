import React from "react";
import styles from "./bangGia.module.scss";
import TablePriceList from "./TablePriceList/TablePriceList";
import { LoadingProvider } from "@/common/context/useLoading";
import { DeviceProvider } from "@/common/context/useDevice";
import PriceListComponent from "./PriceListComponent/PriceListComponent";

const page = () => {
  return (
    <div>
      <PriceListComponent />
    </div>
  );
};

export default page;
