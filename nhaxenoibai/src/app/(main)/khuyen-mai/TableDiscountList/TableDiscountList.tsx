"use client";
import { useLoading } from "@/common/context/useLoading";
import service from "@/common/service/apis";
import { Discount } from "@/common/service/models/Discount";
import ViewBigImg from "@/components/ViewBigImg/ViewBigImg";
import ViewImage from "@/components/ViewImage/ViewImage";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./TableDiscountList.module.scss";

const TableDiscountList = () => {
  const [dataDiscount, setDataDiscount] = useState<Discount.DiscountModel[]>(
    []
  );
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { showLoading, closeLoading } = useLoading();

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

  const getListDiscount = useCallback(async () => {
    try {
      showLoading("GetListDiscount");
      const { result } = await service.discount.getDiscountList(param);
      setDataDiscount(result?.baseDatas);
      setTotalRecordCount(result?.totalRecordCount);
      setCurrentPage(result?.pageIndex);
      closeLoading("GetListDiscount");
    } catch (error) {
      closeLoading("GetListDiscount");
    }
  }, [param, showLoading, closeLoading]);

  useEffect(() => {
    getListDiscount();
  }, [getListDiscount]);

  return (
    <div>
      <Row gutter={[20, 20]}>
        {dataDiscount.map((item: Discount.DiscountModel) => (
          <Col xs={24} md={12} key={item.id}>
            <div>
              <ViewBigImg
                isPreview={false}
                keyImage={item?.fileInforImage?.keyImage ?? ""}
                isHeight40={true}
              />
            </div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.wrapperTime}>
              <div>Bắt đầu:</div>
              <div>{dayjs(item.startTime).format("DD-MM-YYYY HH:mm")}</div>
            </div>
            <div>{item.description}</div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TableDiscountList;
