import React from "react";
import styles from "./LogoComponent.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoBigHead from "@/common/assets/newLogoBigHead.png";

interface ILogoComponentProps {
  onClose?: () => void;
}

const LogoComponent = (props: ILogoComponentProps) => {
  const { onClose } = props;

  return (
    <Link href={"/"} onClick={onClose}>
      <div className={styles.wrapperLogoMobile}>
        <Image
          src={logoBigHead}
          alt="logo"
          width={50}
          height={50}
          quality={100}
        />
        <div className={styles.logoTextContainer}>
          <div className={styles.mainTitle}>Nhà xe Nội Bài</div>
          <div className={styles.subtitle}>Uy tín đặt lên hàng đầu</div>
        </div>
      </div>
    </Link>
  );
};

export default LogoComponent;
