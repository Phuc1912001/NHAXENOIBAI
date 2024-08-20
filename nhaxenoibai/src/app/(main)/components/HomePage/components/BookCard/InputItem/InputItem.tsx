import React, { useContext, useEffect } from "react";
import styles from "./InputItem.module.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { OriginContext } from "@/common/context/originContext";
import { InputEnum, TabBookCar } from "../bookCard.model";
import Image from "next/image";
import redDot from "@/common/assets/red-dot.png";
import blueDot from "@/common/assets/blue-dot.png";

interface IInputItemProps {
  type?: number;
  value: Option | null;
  setValue: (value: Option | null) => void;
  isInvalid: boolean;
  setIsOriginInvalid?: (value: boolean) => void;
  setIsDestinationInvalid?: (value: boolean) => void;
}

interface Option {
  value: {
    place_id: string;
  };
  label: string;
}

const InputItem = ({
  type = InputEnum.origin,
  value,
  setValue,
  isInvalid,
  setIsOriginInvalid,
  setIsDestinationInvalid,
}: IInputItemProps) => {
  const { setOrigin, setDestination, activeTab } = useContext(OriginContext);

  const getLatAndLng = (place: Option | null, type?: number) => {
    if (place && place.value) {
      const placeId = place.value.place_id;
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails({ placeId }, (placeDetails, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          placeDetails?.geometry &&
          placeDetails.geometry.location
        ) {
          const lat = placeDetails.geometry.location.lat();
          const lng = placeDetails.geometry.location.lng();
          const address = placeDetails.formatted_address;

          const location = {
            lat,
            lng,
            name: address,
            label: place.label,
          };

          if (type === InputEnum.origin) {
            setOrigin(location);
          } else {
            setDestination(location);
          }
        }
      });
    }
  };

  const getDefaultPlaceId = async () => {
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({
      address:
        "Sân bay quốc tế Nội Bài (HAN), Phú Cường, Sóc Sơn, Hà Nội, Việt Nam",
    });
    console.log("result1", result);

    if (result.results.length > 0) {
      return result.results[0].place_id;
    }
    return null;
  };

  useEffect(() => {
    if (activeTab === TabBookCar.airport && type === InputEnum.destination) {
      const setDefaultLocation = async () => {
        const placeId = await getDefaultPlaceId();
        if (placeId) {
          setValue({
            value: { place_id: placeId },
            label: "Sân bay Nội bài",
          });
          setDestination({
            place_id: placeId,
            label: "Sân bay Nội bài",
          });
        }
      };
      setDefaultLocation();
    } else if (activeTab !== TabBookCar.airport) {
      setValue(null);
      if (type === InputEnum.origin) {
        setOrigin(null);
      } else {
        setDestination(null);
      }
    }
  }, [activeTab, type, setValue, setOrigin, setDestination]);

  useEffect(() => {
    // Trigger getLatAndLng when the value changes
    getLatAndLng(value, type);
  }, [value]);

  const handleChange = (place: Option | null) => {
    console.log("place", place);

    setValue(place);

    if (type === InputEnum.origin) {
      setIsOriginInvalid?.(false);
    } else {
      setIsDestinationInvalid?.(false);
    }
  };

  return (
    <div>
      <div className={styles.wraperInput}>
        <Image
          src={type === InputEnum.origin ? redDot : blueDot}
          alt="Location Icon"
          width={25}
          height={15}
        />

        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          selectProps={{
            value,
            onChange: handleChange,
            placeholder:
              type === InputEnum.origin ? "Chọn điểm đi" : "Chọn điểm đến",
            isClearable: true,
            defaultValue: value,
            className: "w-full",
            components: {
              DropdownIndicator: null,
            },
            styles: {
              control: (provided) => ({
                ...provided,
                backgroundColor: "#fff",
                borderColor: isInvalid ? "#ff4d4f" : provided.borderColor, // Change border color on validation
              }),
            },
          }}
        />
      </div>
      {isInvalid && (
        <div className={styles.errorMessage}>
          Vui lòng chọn {type === InputEnum.origin ? "điểm đi" : "điểm đến"}.
        </div>
      )}
    </div>
  );
};

export default InputItem;
