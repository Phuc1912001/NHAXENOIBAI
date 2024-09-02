import React from "react";
import styles from "./Partner.module.scss";
import Image from "next/image";
import anh1 from "@/common/assets/defaultAvatar.png";
import Marquee from "react-fast-marquee";

const Partner = () => {
  return (
    <div className={styles.wrapperPartner}>
      <Marquee gradient={false} speed={60}>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
        <div className={styles.wrapperImg}>
          <Image src={anh1} width={40} height={40} alt="" quality={100} />
        </div>
      </Marquee>
    </div>
  );
};

export default Partner;
