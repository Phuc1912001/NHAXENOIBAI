"use client";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./overview.module.scss";
import ReactECharts from "echarts-for-react";
import MobileHeader from "../Components/MobileHeader/MobileHeader";
import { BookCar } from "@/common/service/models/BookCarModel";
import service from "@/common/service/apis";
import { DiscountCode } from "@/common/service/models/DiscountCode";
import { Discount } from "@/common/service/models/Discount";

const Page = () => {
  const [dataBookCarOverview, setDataBookCarOverview] = useState<
    BookCar.BookCarOverViewModel[]
  >([]);

  const [dataDiscountCode, setDataDiscountCode] = useState<
    DiscountCode.DiscountCodeOverViewModel[]
  >([]);
  const [dataDiscount, setDataDiscount] = useState<
    Discount.DiscountOverViewModel[]
  >([]);
  const [listDate, setListDate] = useState<string[]>([]);
  const [listStatusDiscountCode, setListStatusDiscountCode] = useState<
    string[]
  >([]);
  const [listStatusDiscount, setListStatusDiscount] = useState<string[]>([]);

  const getBookCarOverview = async () => {
    try {
      const result = await service.bookCar.getBookCarOverview();

      let newListDate: string[] = [];
      const newDataBookCarOverview: BookCar.BookCarOverViewModel[] = result.map(
        (item: BookCar.BookCarOverViewModel, index: number) => {
          newListDate.push(item?.month ?? "");
          return {
            value: item.value,
            month: item.month,
          };
        }
      );
      setDataBookCarOverview(newDataBookCarOverview);
      setListDate(newListDate);
    } catch (error) {}
  };

  const getDiscountCodeOverview = async () => {
    try {
      const result = await service.discountCode.getDiscountCodeOverview();
      let newListStatus: string[] = [];
      const newDataDiscountOverview: DiscountCode.DiscountCodeOverViewModel[] =
        result.map(
          (item: DiscountCode.DiscountCodeOverViewModel, index: number) => {
            newListStatus.push(item?.status ?? "");
            return {
              value: item.value,
              status: item.status,
            };
          }
        );
      setDataDiscountCode(newDataDiscountOverview);
      setListStatusDiscount(newListStatus);
    } catch (error) {}
  };

  const getDiscountOverview = async () => {
    try {
      const result = await service.discount.getDiscountOverview();

      let newListStatus: string[] = [];
      const newDataDiscountOverview: Discount.DiscountOverViewModel[] =
        result.map((item: Discount.DiscountOverViewModel, index: number) => {
          newListStatus.push(item?.status ?? "");
          return {
            value: item.value,
            status: item.status,
          };
        });
      setDataDiscount(newDataDiscountOverview);
      setListStatusDiscountCode(newListStatus);
    } catch (error) {}
  };

  useEffect(() => {
    getBookCarOverview();
    getDiscountCodeOverview();
    getDiscountOverview();
  }, []);

  const optionDiscountCode = {
    title: {
      text: "Mã Giam gia",
      left: "center",
      top: "bottom",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      },
    },
    legend: {
      orient: "horizontal",
      top: "top",
      left: "center",
      data: listStatusDiscountCode,
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}<br/>({d}%)",
      backgroundColor: "#333",
      borderWidth: 2,
      padding: [10, 15],
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      extraCssText: `
        border-radius: 8px;
        pointer-events: none;
      `,
    },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        data: dataDiscountCode.map((item) => ({
          value: item.value,
          name: item.status,
        })),
      },
    ],
  };

  const optionDiscount = {
    title: {
      text: "Ma khuyen mai",
      left: "center",
      top: "bottom",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      },
    },
    legend: {
      orient: "horizontal",
      top: "top",
      left: "center",
      data: listStatusDiscount,
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}<br/>({d}%)",
      backgroundColor: "#333",
      borderWidth: 2,
      padding: [10, 15],
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      extraCssText: `
        border-radius: 8px;
        pointer-events: none;
      `,
    },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        data: dataDiscount.map((item) => ({
          value: item.value,
          name: item.status,
        })),
      },
    ],
  };

  const optionLine = {
    xAxis: {
      data: listDate,
    },
    yAxis: {},
    series: [
      {
        data: dataBookCarOverview.map((item) => item.value),
        type: "line",
        smooth: true,
      },
    ],
    label: {
      show: true, // Show labels on data points
      position: "top", // Position of the label
      formatter: "{c}", // Format for the label
    },
  };
  return (
    <div>
      <MobileHeader title="Tổng Quan"></MobileHeader>
      <div className={styles.wrapperContent}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <div className={styles.wrapperCard}>
              <ReactECharts option={optionLine} />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.wrapperCard}>
              <ReactECharts option={optionDiscountCode} />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.wrapperCard}>
              <ReactECharts option={optionDiscount} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Page;
