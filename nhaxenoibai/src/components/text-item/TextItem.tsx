import { Col } from "antd";
import styles from "./TextItem.module.scss";
import { IProps } from "./model";
export default function TextItem(props: IProps) {
  const { label, children, className, textItemProps = {}, greyedOut } = props;
  const { isCol = true, spanMobNumber = 24, spanNumber = 12 } = textItemProps;

  return isCol ? (
    <Col
      className={`${styles.nxsbComptReporttextitem} ipadMiniResponsive ${
        className ?? ""
      } `}
      xs={spanMobNumber}
      md={spanNumber}
    >
      <div
        className={`nxsb-compt-reporttextitem-label ${
          greyedOut && styles.greyedOutLabel
        }`}
        style={props.style}
      >
        {label}
      </div>
      <div
        className={`nxsb-compt-reporttextitem-text ${
          greyedOut ? styles.greyedOutText : ""
        }`}
      >
        {children}
      </div>
    </Col>
  ) : (
    <div className={`${styles.nxsbComptReporttextitem} ${className ?? ""}`}>
      <div
        className={`nxsb-compt-reporttextitem-label ${
          greyedOut ? styles.greyedOutLabel : ""
        }`}
        style={props.style}
      >
        {label}
      </div>
      <div
        className={`nxsb-compt-reporttextitem-text ${
          greyedOut ? styles.greyedOutText : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
