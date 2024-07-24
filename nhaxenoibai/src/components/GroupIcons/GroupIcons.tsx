import React from "react";
import styles from "./GroupIcons.module.scss";
import Image from "next/image";
import zalo from "../../common/assets/zalo.png";
import mesager from "../../common/assets/mesanger.png";

const GroupIcons = () => {
  return (
    <div className={styles.containerGroupIcon}>
      <Image
        src={zalo}
        alt="zalo"
        width={40}
        height={40}
        quality={100}
        className={styles.iconWithShadow}
      />
      <Image
        src={mesager}
        alt="zalo"
        width={40}
        height={40}
        quality={100}
        className={styles.iconWithShadowMesage}
      />
    </div>
  );
};

export default GroupIcons;
