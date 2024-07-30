import { Col } from "antd";
import styles from "./TextItem.module.scss";
import { IProps } from "./model";
export default function TextItem(props: IProps) {
  const { label, children, className, textItemProps = {}, greyedOut } = props;
  const { isCol = true, spanMobNumber = 24, spanNumber = 12 } = textItemProps;

  return isCol ? (
    <Col
      className={`${styles.nxnbComptReporttextitem} ipadMiniResponsive ${
        className ?? ""
      } `}
      xs={spanMobNumber}
      md={spanNumber}
    >
      <div
        className={`nxnb-compt-reporttextitem-label ${
          greyedOut && styles.greyedOutLabel
        }`}
        style={props.style}
      >
        {label}
      </div>
      <div
        className={`nxnb-compt-reporttextitem-text ${
          greyedOut ? styles.greyedOutText : ""
        }`}
      >
        {children}
      </div>
    </Col>
  ) : (
    <div className={`${styles.nxnbComptReporttextitem} ${className ?? ""}`}>
      <div
        className={`nxnb-compt-reporttextitem-label ${
          greyedOut ? styles.greyedOutLabel : ""
        }`}
        style={props.style}
      >
        {label}
      </div>
      <div
        className={`nxnb-compt-reporttextitem-text ${
          greyedOut ? styles.greyedOutText : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
