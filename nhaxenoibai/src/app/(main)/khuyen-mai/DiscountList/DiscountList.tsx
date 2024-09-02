import React from "react";
import styles from "./DiscountList.module.scss";
import { DeviceProvider } from "@/common/context/useDevice";
import { LoadingProvider } from "@/common/context/useLoading";
import TableDiscountList from "../TableDiscountList/TableDiscountList";

const DiscountList = () => {
  return (
    <DeviceProvider>
      <LoadingProvider>
        <div className={styles.wrapperDiscountList}>
          <div className={styles.titleDiscountList}>KHUYẾN MẠI</div>
          <TableDiscountList />
        </div>
      </LoadingProvider>
    </DeviceProvider>
  );
};

export default DiscountList;
