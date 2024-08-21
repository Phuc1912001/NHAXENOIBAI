"use client";
import { LoadScript } from "@react-google-maps/api";
import { Col, Row } from "antd";
import { useState } from "react";

import { OriginContext } from "@/common/context/originContext";
import BookCard from "./components/BookCard/BookCard";
import { TabBookCar } from "./components/BookCard/bookCard.model";
import { MapCard } from "./components/MapCard/MapCard";
import { DeviceProvider } from "@/common/context/useDevice";
import { LoadingProvider } from "@/common/context/useLoading";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [origin, setOrigin] = useState<A>();
  const [destination, setDestination] = useState<A>();
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<number>(TabBookCar.airport);

  return (
    <div className={styles.wrapperBookCar}>
      <DeviceProvider>
        <LoadingProvider>
          <OriginContext.Provider
            value={{
              origin,
              setOrigin,
              destination,
              setDestination,
              distance,
              setDistance,
              duration,
              setDuration,
              activeTab,
              setActiveTab,
            }}
          >
            <LoadScript
              googleMapsApiKey={
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
              }
              libraries={["places"]}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={10} xxl={8}>
                  <BookCard />
                </Col>

                <Col xs={24} md={14} xxl={16}>
                  <MapCard />
                </Col>
              </Row>
            </LoadScript>
          </OriginContext.Provider>
        </LoadingProvider>
      </DeviceProvider>
    </div>
  );
};

export default HomePage;
