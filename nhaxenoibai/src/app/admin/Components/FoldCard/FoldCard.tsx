import { useEffect, useRef, useState } from "react";
import styles from "./FoldCard.module.scss";
import { IProps } from "./model";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

function Card(props: IProps) {
  const {
    title,
    children,
    operate,
    className,
    titleIcon,
    tagName,
    defaultDisplay = "block",
    open = true,
    onChange,
    noDisplayBorder = false,
    cardClass,
  } = props;
  const [carConDisplay, setCarConDisplay] = useState(defaultDisplay);
  const openCurrentRef = useRef(defaultDisplay);
  const setDisPlay = (value: "block" | "none") => {
    setCarConDisplay(value);
    openCurrentRef.current = value;
  };
  useEffect(() => {
    if (open) {
      setDisPlay("block");
    } else {
      setDisPlay("none");
    }
  }, [open]);

  const isShowCon = (e: A) => {
    e.stopPropagation();
    const str = carConDisplay === "block" ? "none" : "block";
    setDisPlay(str);
    onChange?.(openCurrentRef.current === "block");
  };

  const newClass = className ?? "";
  return (
    <div className={`${styles.nxnbCard} ${cardClass}`}>
      <div
        className={`nxnb-card-header ${
          noDisplayBorder ? "nxnbNoBoderCard" : ""
        }`}
        onClick={isShowCon}
      >
        <div className="nxnb-card-left">
          <div className="cardTitle nxnb-two-rows">{title}</div>
          {titleIcon && <div style={{ marginLeft: "0.5rem" }}>{titleIcon}</div>}
        </div>
        <div className="nxnb-card-right " style={{ paddingRight: "8px" }}>
          {tagName && <div style={{ marginLeft: "0.5rem" }}>{tagName}</div>}
          {operate ?? ""}
          {carConDisplay === "block" ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>
      <div
        className={`nxnb-card-con ${newClass}`}
        style={{ display: carConDisplay }}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
