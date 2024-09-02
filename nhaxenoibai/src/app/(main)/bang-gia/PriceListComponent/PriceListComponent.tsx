import React from "react";
import styles from "./PriceListComponent.module.scss";
import TablePriceList from "../TablePriceList/TablePriceList";
import { DeviceProvider } from "@/common/context/useDevice";
import { LoadingProvider } from "@/common/context/useLoading";
const PriceListComponent = () => {
  return (
    <DeviceProvider>
      <LoadingProvider>
        <div className={styles.wrapperPriceList}>
          <div className={styles.titlePriceList}>BẢNG GIÁ</div>
          <div className={styles.secondTitle}>BẢNG GIÁ SÂN BAY NỘI BÀI</div>
          <div>
            <TablePriceList />
          </div>
          <div className={styles.wrapperDesc}>
            <div>
              <span>Giá TRỌN GÓI</span>, đã BAO GỒM phí ra, vào bãi đỗ sân bay.
            </div>
            <div>
              Giá cước : Cam kết rẻ hơn <span>20% – 50%</span> so với giá thị
              trường.
            </div>
          </div>
        </div>
      </LoadingProvider>
    </DeviceProvider>
  );
};

export default PriceListComponent;
