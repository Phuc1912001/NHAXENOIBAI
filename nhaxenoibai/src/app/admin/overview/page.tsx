"use client";
import { Col, Row } from "antd";
import React from "react";
import styles from "./overview.module.scss";
import ReactECharts from "echarts-for-react";

const page = () => {
  const option = {
    title: {
      text: "Pie Chart Example", // Title for Pie Chart
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
      left: "center", // Changed from 'x' to 'left' to match current ECharts syntax
      data: ["A", "B", "C", "D", "E"],
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
        data: [
          { value: 335, name: "A" },
          { value: 310, name: "B" },
          { value: 234, name: "C" },
          { value: 135, name: "D" },
          { value: 1548, name: "E" },
        ],
      },
    ],
  };

  const optionLine = {
    xAxis: {
      data: ["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
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
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <div className={styles.wrapperCard}>
            <ReactECharts option={optionLine} />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className={styles.wrapperCard}>
            <ReactECharts option={option} />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className={styles.wrapperCard}>
            <ReactECharts option={option} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default page;
