import React from "react";
import styles from "./TableMobile.module.scss";
import { Button, Pagination } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface IBaseColumnTable<T> {
  dataIndex: keyof T;

  render?: (data?: T) => React.ReactElement;
  label?: string;
}

interface IButtonProperties {
  onClick?: () => void;
  showIcon?: boolean;
  disable?: boolean;
}

interface IBodyColumn<T> extends IBaseColumnTable<T> {
  itemsPerRow?: number;
}

interface IHeaderColumn<T> extends IBaseColumnTable<T> {
  editButton?: IButtonProperties;
  deleteButton?: IButtonProperties;
  onClick?: () => void;
}

export interface ITableSection<T> {
  header?: IHeaderColumn<T>;
  body?: IBodyColumn<T>[] | undefined;
}

export interface ITable<T> {
  list: T[];
  tableSection: ITableSection<T>;
  pagination?: A;
}

const TableMobile = <T,>(props: ITable<T>) => {
  const { list, tableSection, pagination } = props;
  const { body, header } = tableSection;
  const onRenderHeader = (item: T) => {
    return (
      <>
        {header?.render ? (
          header?.render(item)
        ) : (
          <div
            className={styles.headerContent}
            onClick={header?.onClick}
            aria-hidden
          >
            {header?.dataIndex ? <>{item[header.dataIndex]}</> : <></>}
          </div>
        )}
      </>
    );
  };

  const onRenderValueBody = (
    currentRecord: T,
    currentColumn: IBodyColumn<T>
  ) => {
    if (currentColumn?.render) return currentColumn.render(currentRecord);
    if (currentColumn.dataIndex)
      return <>{currentRecord[currentColumn.dataIndex]} </> ?? <></>;
    return <></>;
  };
  return (
    <div>
      {list.length > 0 ? (
        <div>
          {list.map((item, index) => (
            <div className={styles.tableForMobile} key={`${index + 1}`}>
              <div className={styles.tableHeader}>{onRenderHeader(item)}</div>

              <div className={styles.tableContent}>
                <div className={styles.items}>
                  {Array.isArray(body) &&
                    body.map((itemBody, indexBody) => (
                      <div
                        className={`${styles.itemGroup} ${
                          (indexBody + 1) % 2 === 0 && styles.borderLeft
                        }`}
                        key={`${indexBody + 1 + index}`}
                      >
                        <div className={styles.titleMobile}>
                          {onRenderValueBody(item, itemBody)}
                        </div>
                        <div className={styles.labelMobile}>
                          {itemBody.label}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
          {pagination && (
            <div className={styles.mobileTablePagination}>
              <Pagination {...pagination} />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.emptyText}>Không có bản ghi nào.</div>
      )}
    </div>
  );
};

export default TableMobile;
