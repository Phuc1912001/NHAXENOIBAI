"use client";
import { OriginContext } from "@/common/context/originContext";
import service from "@/common/service/apis";
import { Price } from "@/common/service/models/Price";
import {
  DeleteOutlined,
  InfoCircleFilled,
  TruckOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import styles from "./BookCard.module.scss";
import InputItem from "./InputItem/InputItem";
import { InputEnum, PlaceOption, TabBookCar } from "./bookCard.model";
import { useLoading } from "@/common/context/useLoading";
import { useNotification } from "@/components/Notification/useNotification";
import { BookCar } from "@/common/service/models/BookCarModel";
import ModalInforBookCar from "./ModalInforBookCar/ModalInforBookCar";

// Define the interface

interface IOptionValue {
  label?: string;
  value?: string | number;
  money?: number;
}

const BookCard = () => {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    duration,
    setDuration,
    setDistance,
    distance,
    activeTab,
    setActiveTab,
  } = useContext(OriginContext);
  const [form] = useForm();

  const [originValue, setOriginValue] = useState<PlaceOption | null>(null);
  const [destinationValue, setDestinationValue] = useState<PlaceOption | null>(
    null
  );
  const { isLoading, showLoading, closeLoading } = useLoading();

  const [optionPrice, setOptionPrice] = useState<IOptionValue[]>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [twoWay, setTwoWay] = useState<boolean>(false);

  const [showNote, setShowNote] = useState<boolean>(false);
  const [showDiscountCode, setShowDiscountCode] = useState<boolean>(false);

  const [isOriginInvalid, setIsOriginInvalid] = useState(false);
  const [isDestinationInvalid, setIsDestinationInvalid] = useState(false);

  const [discountMoney, setDiscountMoney] = useState<number>();
  const notification = useNotification();

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [carType, setCarType] = useState<number>(9);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const getFullPriceList = async () => {
    try {
      showLoading("getFullPriceList");
      const { result } = await service.price.getFullPriceList();
      let newData = result.baseDatas.map((item: Price.PriceModel) => ({
        label: item.carType,
        value: item.id,
        money: item?.money,
      }));
      if (newData.length > 0) {
        form.setFieldValue("carType", newData[0].value);
      }
      setOptionPrice(newData);
      closeLoading("getFullPriceList");
    } catch (error) {
      closeLoading("getFullPriceList");
    }
  };

  useEffect(() => {
    getFullPriceList();
  }, []);

  useEffect(() => {
    if (origin) {
      setOriginValue({
        value: {
          place_id: origin.place_id,
        },
        label: origin.label,
      });
    }
    if (destination) {
      setDestinationValue({
        value: {
          place_id: destination.place_id,
        },
        label: destination.label,
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    // Set the current time as the default value for the time picker
    form.setFieldsValue({
      startTime: dayjs(), // Set the default time to the current time
    });
  }, [form]);

  const onChangeStatus = (status: boolean) => {
    setTwoWay(status);
  };

  const handleSubmit = async () => {
    const value = form.getFieldsValue();

    const payload: BookCar.BookCarModel = {
      origin: origin?.label,
      destination: destination?.label,
      duration: duration,
      distantce: distance,
      twoWay: twoWay,
      startTime: value?.startTime,
      fullName: value?.fullName,
      phoneNumber: value?.phoneNumber,
      note: value?.note,
      discountCode: value?.discountCode,
      totalNumber: totalMoney,
    };

    try {
      showLoading("bookCar");
      const { result } = await service.bookCar.createBookCar(payload);
      setOpenModal(false);
      if (destination) {
        setDestinationValue({
          value: {
            place_id: destination.place_id,
          },
          label: destination.label,
        });
      }
      handleChangeTab(TabBookCar.airport);
      notification.success("Đặt xe thành công.");
      closeLoading("bookCar");
    } catch (error) {
      closeLoading("bookCar");
    }
  };

  const swapLocations = () => {
    const tempOrigin = origin;
    const tempOriginValue = originValue;

    setOrigin(destination);
    setOriginValue(destinationValue);

    setDestination(tempOrigin);
    setDestinationValue(tempOriginValue);
  };

  const filterOption = (input: string, option?: IOptionValue) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
    ((option as any)?.email || "").toLowerCase().includes(input.toLowerCase());

  // Disable past dates
  const disablePastDates = (currentDate: dayjs.Dayjs) => {
    return currentDate && currentDate.isBefore(dayjs().startOf("day"));
  };

  // Disable past times if the selected date is today
  const disablePastTimes = () => {
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();

    // Return functions for disabledHours and disabledMinutes
    return {
      disabledHours: () => {
        const hours = [];
        if (selectedDate?.isSame(dayjs(), "day")) {
          for (let i = 0; i < currentHour; i++) {
            hours.push(i);
          }
        }
        return hours;
      },
      disabledMinutes: (selectedHour: number) => {
        const minutes = [];
        if (
          selectedDate?.isSame(dayjs(), "day") &&
          selectedHour === currentHour
        ) {
          for (let i = 0; i < currentMinute; i++) {
            minutes.push(i);
          }
        }
        return minutes;
      },
    };
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    form.setFieldsValue({ startDate: date });
    form.setFieldsValue({ startTime: dayjs() });
  };

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    form.setFieldsValue({ startTime: time });
  };

  const resetForm = () => {
    form.resetFields();
    setTotalAmount(0);
    setTwoWay(false);
    setSelectedDate(dayjs());
    setIsOriginInvalid(false);
    setIsDestinationInvalid(false);
    form.setFieldsValue({
      startDate: dayjs(),
      startTime: dayjs(),
      carType: optionPrice[0]?.value,
      discountCode: "",
      note: "",
    });
    setOrigin(null);
    setOriginValue(null);
    setDestination(null);
    setDistance(0);
    setDuration("");
    setTotalAmount(0);
    setTotalMoney(0);
    setDiscountMoney(0);
    setShowNote(false);
    setShowDiscountCode(false);
  };
  const handleChangeTab = (tab: number) => {
    setActiveTab(tab);
    resetForm();
  };

  const handleDeleteNote = () => {
    setShowNote(false);
    form.setFieldValue("note", "");
  };

  const handleDeleteDiscount = () => {
    setShowDiscountCode(false);
    form.setFieldValue("discountCode", "");
  };

  const handleConfirmDiscountCode = async () => {
    const titleDiscountCode = form.getFieldValue("discountCode");
    try {
      showLoading("handleConfirmDiscountCode");
      const { result, errorCode, message } =
        await service.discountCode.FindDiscountCode(titleDiscountCode);
      if (errorCode === 1) {
        notification.error(message);
      } else {
        notification.success("Sử dụng mã thành công.");
      }
      setDiscountMoney(result.discountCodeMoney);
      closeLoading("handleConfirmDiscountCode");
    } catch (error) {
      closeLoading("handleConfirmDiscountCode");
    }
  };

  useEffect(() => {
    setTotalAmount(distance * carType);

    if (twoWay) {
      setTotalAmount((prev) => prev * 2);
    } else {
      setTotalAmount(distance * carType);
    }
  }, [distance, twoWay, carType]);

  useEffect(() => {
    if (discountMoney) {
      setTotalMoney(totalAmount - discountMoney);
    } else {
      setTotalMoney(totalAmount);
    }
  }, [totalAmount, discountMoney]);

  const handleChangeCartype = (value: string | number) => {
    const selectedOption = optionPrice.find((option) => option.value === value);
    const selectedMoney = selectedOption?.money
      ? selectedOption.money / 1000
      : 0;
    setCarType(selectedMoney);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenBookCarInfor = async () => {
    if (!originValue) {
      setIsOriginInvalid(true);
    } else {
      setIsOriginInvalid(false);
    }

    if (!destinationValue) {
      setIsDestinationInvalid(true);
    } else {
      setIsDestinationInvalid(false);
    }
    await form.validateFields();
    if (!isOriginInvalid && !isDestinationInvalid) {
      setOpenModal(true);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className={styles.formWrapper}>
        <div className={styles.wrapperHeader}>
          <div className={styles.titleOrderCar}>ĐẶT XE</div>
          <div
            className={
              activeTab === TabBookCar.airport
                ? styles.tabActive
                : styles.tabInActive
            }
            onClick={() => handleChangeTab(TabBookCar.airport)}
          >
            Sân bay
          </div>
          <div
            className={
              activeTab === TabBookCar.road
                ? styles.tabActive
                : styles.tabInActive
            }
            onClick={() => handleChangeTab(TabBookCar.road)}
          >
            Đường dài
          </div>
        </div>

        <Form layout="vertical" form={form}>
          <InputItem
            type={InputEnum.origin}
            value={originValue}
            setValue={setOriginValue}
            isInvalid={isOriginInvalid}
            setIsOriginInvalid={setIsOriginInvalid}
          />
          <InputItem
            type={InputEnum.destination}
            value={destinationValue}
            setValue={setDestinationValue}
            isInvalid={isDestinationInvalid}
            setIsDestinationInvalid={setIsDestinationInvalid}
          />
          <Row gutter={[12, 6]} className={styles.wrapperInforRoad}>
            <Col xs={24} lg={12}>
              <div className={styles.wrapperDuration}>
                <div>Trong Khoảng: </div>
                <div>{duration ? duration : "0 giờ"}</div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.wrapperDistance}>
                <div>Khoảng cách:</div>
                <div>
                  {distance ? `${(distance / 1000).toFixed(2)} km` : "0 km"}
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[12, 6]}>
            <Col xs={24} lg={12}>
              <Row className={styles.swapContainer}>
                <Col xs={12} style={{ display: "flex", alignItems: "center" }}>
                  <div className={styles.wrapperTwoWay}>
                    <Switch
                      checked={twoWay}
                      onChange={(value: A) => onChangeStatus(value)}
                    />
                    <div>2 chiều</div>
                  </div>
                </Col>
                <Col xs={12}>
                  <Button onClick={swapLocations}>Đảo chiều</Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={12} className={styles.wrapperItem}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại xe.",
                  },
                ]}
                name="carType"
                label="Loại xe:"
              >
                <Select
                  placeholder="Chọn loại số tiền"
                  options={optionPrice}
                  onChange={(money: A) => handleChangeCartype(money)}
                  showSearch
                  filterOption={filterOption}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 6]}>
            <Col xs={12} className={styles.wrapperItem}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày đi.",
                  },
                ]}
                name="startDate"
                label="Ngày đi:"
                initialValue={dayjs()}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  inputReadOnly
                  disabledDate={disablePastDates}
                  onChange={handleDateChange}
                />
              </Form.Item>
            </Col>
            <Col xs={12} className={styles.wrapperItem}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giờ đi.",
                  },
                  {
                    validator: (_: A, value: A) => {
                      if (value) {
                        const selectedTime = dayjs(value);
                        const now = dayjs();

                        if (selectedTime.isBefore(now, "minute")) {
                          return Promise.reject(
                            new Error("Giờ đi không được là quá khứ.")
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                name="startTime"
                label="Giờ đi:"
              >
                <TimePicker
                  style={{ width: "100%" }}
                  format="HH:mm"
                  inputReadOnly
                  disabledTime={disablePastTimes}
                  onChange={handleTimeChange}
                  defaultValue={dayjs()}
                />
              </Form.Item>
            </Col>
            <Col xs={12} className={styles.wrapperItem}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên.",
                  },
                ]}
                name="fullName"
                label="Họ và tên:"
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col xs={12} className={styles.wrapperItem}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền số điện thoại.",
                  },
                ]}
                name="phoneNumber"
                label="Số điện thoại:"
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 6]} style={{ marginBottom: "12px" }}>
            <Col xs={12}>
              <span
                className={styles.textNote}
                onClick={() => setShowNote(true)}
              >
                + Thêm ghi chú
              </span>
            </Col>
            <Col xs={12}>
              <span
                className={styles.textNote}
                onClick={() => setShowDiscountCode(true)}
              >
                + Mã giảm giá
              </span>
            </Col>
          </Row>

          {showNote && (
            <Row gutter={[12, 6]}>
              <Col xs={22} className={styles.wrapperItem}>
                <Form.Item name="note" label="Ghi chú :">
                  <TextArea placeholder="Nhập ghi chú" />
                </Form.Item>
              </Col>
              <Col xs={2}>
                <div
                  className={styles.btnDelete}
                  onClick={() => handleDeleteNote()}
                >
                  <DeleteOutlined />
                </div>
              </Col>
            </Row>
          )}

          {showDiscountCode && (
            <Row gutter={[12, 6]}>
              <Col xs={22} className={styles.wrapperItem}>
                <Form.Item name="discountCode" label="Mã giảm giá :">
                  <Space.Compact style={{ width: "100%" }}>
                    <Input placeholder="Nhập mã giảm giá" />
                    <div className={styles.btnConfirm}>
                      <Button
                        onClick={handleConfirmDiscountCode}
                        type="primary"
                      >
                        Xác nhận
                      </Button>
                    </div>
                  </Space.Compact>
                </Form.Item>
              </Col>
              <Col xs={2} onClick={() => handleDeleteDiscount()}>
                <div className={styles.btnDelete}>
                  <DeleteOutlined />
                </div>
              </Col>
            </Row>
          )}

          <div className={styles.wrapperTotalAmount}>
            <div>Thành tiền :</div>
            <div className={discountMoney ? styles.textTotalAmount : ""}>
              {totalAmount.toLocaleString("vi-VN")} đ
            </div>
          </div>
          {discountMoney !== undefined &&
            discountMoney !== null &&
            discountMoney > 0 && (
              <div className={styles.wrapperDiscountCode}>
                <div>Số tiền giảm:</div>
                <div>{discountMoney.toLocaleString("vi-VN")} đ</div>
              </div>
            )}

          <div className={styles.wrapperTotalMoney}>
            <div>Đơn giá:</div>
            <div>
              {totalMoney > 0 ? totalMoney.toLocaleString("vi-VN") : 0} đ{" "}
            </div>
          </div>

          <div className={styles.wrapperBookCar}>
            <Button
              type="primary"
              className={styles.btnBookCar}
              icon={<TruckOutlined />}
              iconPosition="end"
              onClick={handleOpenBookCarInfor}
            >
              Đặt Xe
            </Button>
          </div>
        </Form>
      </div>
      <ModalInforBookCar
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        originValue={originValue}
        destinationValue={destinationValue}
        duration={duration}
        distance={distance}
        valueForm={form.getFieldsValue()}
        twoWay={twoWay}
        totalMoney={totalMoney}
        totalAmount={totalAmount}
        discountMoney={discountMoney}
      />
    </Spin>
  );
};

export default BookCard;
