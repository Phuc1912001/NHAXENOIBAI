import React from "react";
import styles from "./LogoAdmin.module.scss";
import logoAdmin from "../../../../common/assets/newLogoBigHead.png";
import Image from "next/image";

const LogoAdmin = () => {
  return (
    <div className={styles.wrapperLogo}>
      <Image src={logoAdmin} alt="logo admin" width={60} height={60} />
      <div className={styles.mainTitle}>Nhà Xe Nội Bài</div>
    </div>
  );
};

export default LogoAdmin;
