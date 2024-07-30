import React from "react";
import styles from "./Status.module.scss";

interface IStatusProperties<
  U extends Record<number, IValueOfStatus>,
  T extends number
> {
  label: T;
  data: U;
}

interface IValueOfStatus {
  bgColor: string;
  color: string;
  text: string;
  name: string;
}

const Status = <U extends Record<number, IValueOfStatus>, T extends number>(
  props: IStatusProperties<U, T>
) => {
  const { data, label } = props;
  const { text, color, bgColor, name } = data[label] ?? {};

  return (
    <div
      className={`${styles.statusTag} ${styles?.[`statusTag-${name}`]}`}
      style={{ backgroundColor: bgColor, color: color, borderColor: color }}
    >
      {text}
    </div>
  );
};

export default Status;
