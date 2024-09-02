"use client";
import { Col, Row } from "antd";
import styles from "./PeopleReview.module.scss";
import { useEffect, useState } from "react";
import { BookCar } from "@/common/service/models/BookCarModel";
import service from "@/common/service/apis";

const PeopleReview = () => {
  const [customers, setCustomers] = useState<BookCar.CustomerBookCarModel[]>(
    []
  );
  const [displayedCustomers, setDisplayedCustomers] = useState<
    BookCar.CustomerBookCarModel[]
  >([]);

  const getCustomer = async () => {
    const result = await service.bookCar.getCustomer();
    setCustomers(result);
    setDisplayedCustomers(result.slice(0, 5)); // Display the first 5 customers initially
  };

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedCustomers((prev) => {
        // Calculate the next index to display
        const currentIndex = customers.indexOf(prev[prev.length - 1]);
        const nextIndex = (currentIndex + 1) % customers.length;

        // Remove the first customer and add the next one from the full list
        return [...prev.slice(1), customers[nextIndex]];
      });
    }, 2000); // Change every 1 second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [customers]);

  return (
    <div className={styles.wrapperPeopleReview}>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <div className={styles.textTitle}>Khách hàng đặt xe</div>

          {displayedCustomers.map((item, index) => (
            <div key={index} className={styles.containerCustomer}>
              <div className={styles.wrapperCustomer}>
                Khách hàng:{" "}
                <span style={{ fontWeight: 700 }}>{item?.customerName}</span>{" "}
                vừa đặt xe đi
                <span> {item?.destination}</span> ({item?.phoneNumber})
              </div>
            </div>
          ))}
        </Col>
        <Col xs={24} md={12}>
          <div className={styles.textTitle}>Đánh giá của khách hàng</div>
        </Col>
      </Row>
    </div>
  );
};

export default PeopleReview;
