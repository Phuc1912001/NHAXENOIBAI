"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./TablePriceList.module.scss";
import { Price } from "@/common/service/models/Price";
import { useLoading } from "@/common/context/useLoading";
import service from "@/common/service/apis";
import Table, { ColumnsType } from "antd/es/table";
import { DeviceProvider } from "@/common/context/useDevice";
import { Spin } from "antd";
import TableMobile, {
  ITableSection,
} from "@/app/admin/Components/TableMobile/TableMobile";

const TablePriceList = () => {
  const [dataPriceList, setDataPriceList] = useState<Price.PriceModel[]>([]);
  const { isLoading, showLoading, closeLoading } = useLoading();
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paramInitial: Common.DataGridModel = {
    pageInfo: {
      pageSize: 10,
      pageNo: 1,
      total: 0,
    },
    searchInfo: {
      searchOperator: 0,
      searchRule: [
        {
          keyWord: "",
          searchColumns: [],
        },
      ],
    },
  };
  const [param, setParam] = useState<Common.DataGridModel>(paramInitial);

  const getListPrice = useCallback(async () => {
    try {
      showLoading("GetlistPrice");
      const { result } = await service.price.getPriceList(param);
      setDataPriceList(result?.baseDatas);
      setTotalRecordCount(result?.totalRecordCount);
      setCurrentPage(result?.pageIndex);
      closeLoading("GetlistPrice");
    } catch (error) {
      closeLoading("GetlistPrice");
    }
  }, [param, showLoading, closeLoading]);

  useEffect(() => {
    getListPrice();
  }, [getListPrice]);

  const columns: ColumnsType<Price.PriceModel> = [
    {
      title: "Loại xe",
      dataIndex: "carType",
      key: "carType",
      render: (_, record) => (
        <div className={styles.title}>{record.carType}</div>
      ),
    },
    {
      title: "Giá tiền/Km",
      dataIndex: "moneyTitle",
      key: "moneyTitle",
      render: (_, record) => <div>{record.moneyTitle}</div>,
    },
    {
      title: "Hà Nội -> Nội Bài ",
      dataIndex: "fromHanoiToNoiBai",
      key: "fromHanoiToNoiBai",
      render: (_, record) => <div>{record.fromHanoiToNoiBai}</div>,
    },
    {
      title: "Nội Bài -> Hà Nội",
      dataIndex: "fromNoiBaiToHanoi",
      key: "fromNoiBaiToHanoi",
      render: (_, record) => <div>{record.fromNoiBaiToHanoi}</div>,
    },
    {
      title: "Hai Chiều(Trong ngày)",
      dataIndex: "toWay",
      key: "toWay",
      render: (_, record) => <div>{record.toWay}</div>,
    },
  ];

  const tableSections: ITableSection<Price.PriceModel> = {
    header: {
      dataIndex: "carType",
      render: (record) => (
        <div className={styles.wrapperHeader}>
          <div className={styles.wrapperTitle}>
            <div className={styles.title}>
              <div className={styles.typeBanding}>{record?.carType}</div>
            </div>
          </div>
        </div>
      ),
    },
    body: [
      {
        label: "Hà Nội->Nội Bài",
        dataIndex: "fromHanoiToNoiBai",
        render: (record) => (
          <div className={styles.content}>{record?.fromHanoiToNoiBai}</div>
        ),
      },
      {
        label: "Nội Bài->Hà Nội",
        dataIndex: "fromHanoiToNoiBai",
        render: (record) => (
          <div className={styles.content}>{record?.fromNoiBaiToHanoi}</div>
        ),
      },
      {
        label: "Hai chiều(trong ngày)",
        dataIndex: "toWay",
        render: (record) => (
          <div className={styles.content}>{record?.toWay}</div>
        ),
      },
    ],
  };

  return (
    <Spin spinning={isLoading}>
      <div className={styles.pcTable}>
        <Table
          columns={columns}
          dataSource={dataPriceList}
          tableLayout="auto"
          className={`${styles.pcTable} nxsb-border-table`}
          rowKey={(record: A) => record.id ?? new Date().getTime()}
          pagination={false}
        />
      </div>
      <div className={styles.mobileTable}>
        <TableMobile list={dataPriceList} tableSection={tableSections} />
      </div>
    </Spin>
  );
};

export default TablePriceList;
