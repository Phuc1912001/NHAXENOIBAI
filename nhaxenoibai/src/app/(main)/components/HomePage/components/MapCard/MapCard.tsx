import React, { useState, useContext, useEffect, useCallback } from "react";
import { GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import { OriginContext } from "@/common/context/originContext";
import { useDevice } from "@/common/context/useDevice";
import { EDeviceType } from "@/common/enum/EDevice";

export function MapCard() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { origin, destination, setDuration, setDistance } =
    useContext(OriginContext);
  const [directionRoutePoint, setDirectionRoutePoint] =
    useState<google.maps.DirectionsResult | null>(null);

  const { type: typeDevice } = useDevice();
  const isMobile = typeDevice === EDeviceType.Mobile;

  const containerStyle = {
    width: "100%",
    height: isMobile ? "500px" : "100%",
  };

  const [center, setCenter] = useState({
    lat: 21.2142,
    lng: 105.8045,
  });

  const directionRoute = useCallback(() => {
    if (!origin || !destination) {
      return;
    }

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("Result:", result);

          setDirectionRoutePoint(result);
          setDuration(result?.routes[0].legs[0].duration?.text || null);
          setDistance(result?.routes[0].legs[0].distance?.value || null);
        } else {
          console.error("Error fetching directions", status);
        }
      }
    );
  }, [origin, destination, setDistance, setDuration]);

  useEffect(() => {
    if (origin && origin.lat && origin.lng && map) {
      setCenter({
        lat: origin.lat,
        lng: origin.lng,
      });
    } else {
      setDirectionRoutePoint(null);
    }
    directionRoute();
  }, [origin, map, directionRoute]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    } else {
      setDirectionRoutePoint(null);
    }
    directionRoute();
  }, [destination, map, directionRoute]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location", error);
        }
      );
    }
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={(map) => setMap(map)}
    >
      {origin && (
        <MarkerF
          position={{ lat: origin.lat, lng: origin.lng }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      )}

      {destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}

      {directionRoutePoint && (
        <DirectionsRenderer
          directions={directionRoutePoint}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#0072d0",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}
