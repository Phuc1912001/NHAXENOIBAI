import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./CreateDiscountPanel.module.scss";
import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useUnsavedChanges } from "@/common/hook/useUnsavedChanges";
import { useLoading } from "@/common/context/useLoading";
import { useNotification } from "@/components/Notification/useNotification";
import { Discount } from "@/common/service/models/Discount";
import ModalDiscard from "@/components/ModalDiscard/ModalDiscard";
import service from "@/common/service/apis";
import { Money } from "@/common/service/models/Money";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { PanelRefDiscount } from "../../discount.model";
import TextItem from "@/app/admin/Components/text-item/TextItem";
import Status from "@/components/Status/Status";
import { EEventStatusProperties } from "@/app/admin/ma-giam-gia/discountCode.model";
import UploadPhoto from "@/app/admin/Components/UploadPhoto/UploadPhoto";
import {
  IInitValue,
  UploadPhotoRef,
} from "@/app/admin/Components/UploadPhoto/UploadPhoto.model";
import ViewImage from "@/components/ViewImage/ViewImage";
import { useDevice } from "@/common/context/useDevice";
import { EDeviceType } from "@/common/enum/EDevice";
import DateAndTime from "@/app/admin/Components/DateAndTime/DateAndTime";

interface ICreateDiscountPanel {
  getListDiscount: () => void;
  getDiscountNotice: () => void;
}

interface IOptionValue {
  label?: string;
  value?: string | number;
}

const CreateDiscountPanel = (
  props: ICreateDiscountPanel,
  ref: React.Ref<PanelRefDiscount>
) => {
  const { getListDiscount, getDiscountNotice } = props;
  const [type, setType] = useState<string>("Create");
  const [isOpen, setIsOpenPanel] = useState<boolean>(false);
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { showLoading, closeLoading } = useLoading();
  const [selectedData, setSelectedData] = useState<Discount.DiscountModel>();
  const notification = useNotification();

  const uploadPhotoRef = useRef<UploadPhotoRef>(null);
  const initialFieldValues = {
    imageSrc: "",
    imageFile: null,
  };
  const [values, setValues] = useState<IInitValue>(initialFieldValues);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const { isDirty, handleFormChange, setIsDirty } = useUnsavedChanges(
    form,
    isOpen
  );

  const [optionMoney, setOptionMoney] = useState<IOptionValue[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const { type: typeDevice } = useDevice();
  const isMobile = typeDevice === EDeviceType.Mobile;

  // date
  const [isEndBeforeStart, setIsEndBeforeStart] = useState<boolean>(false);

  const getFullListMoney = async () => {
    try {
      showLoading("GetFullListMoney");
      const { result } = await service.money.getFullListMoney();
      let newData = result.baseDatas.map((item: Money.MoneyModel) => ({
        label: item.title,
        value: item.id,
      }));
      setOptionMoney(newData);
      closeLoading("GetFullListMoney");
    } catch (error) {
      closeLoading("GetFullListMoney");
    }
  };

  useImperativeHandle(ref, () => ({
    openPanel,
  }));

  const openPanel = (data?: Discount.DiscountModel, type?: string) => {
    setIsOpenPanel(true);
    setType(type ?? "Create");
    if (data) {
      const dataDiscountCode = {
        ...data,
        startTime: {
          date: dayjs(data.startTime).format("YYYY-MM-DD"),
          time: dayjs(data.startTime).format(),
        },
        endTime: {
          date: dayjs(data.endTime).format("YYYY-MM-DD"),
          time: dayjs(data.endTime).format(),
        },
      };

      form.setFieldsValue(dataDiscountCode);
      setSelectedData(data);
    }

    if (type !== "View") {
      getFullListMoney();
    }
  };

  const handleClose = () => {
    if (isDirty) {
      setIsModalVisible(true);
    } else {
      setIsOpenPanel(false);
      form.resetFields();
      setShowMessage(false);
      setValues({
        ...values,
        imageSrc: "",
        imageFile: undefined,
      });
      setPreviewUrl("");
    }
  };

  const handleSubmit = async () => {
    try {
      showLoading("CreateDiscount");
      let isValid = true;
      if (!values.imageSrc && !previewUrl) {
        setShowMessage(true);
        isValid = false;
      }
      try {
        await form.validateFields();
      } catch (error) {
        isValid = false;
      }
      if (!isValid) {
        closeLoading("CreateDiscount");
        return;
      }
      const model = form.getFieldsValue();
      const getStartTime = form.getFieldValue("startTime");
      console.log("getStartTime", getStartTime);

      const formattedDate = dayjs(getStartTime.date).format("YYYY-MM-DD");
      const formattedTime = dayjs(getStartTime.time).format("HH:mm:ss");

      const combinedDateTime = `${formattedDate}T${formattedTime}Z`;
      const getEndTime = form.getFieldValue("endTime");
      const endDate = dayjs(getEndTime.date).format("YYYY-MM-DD");
      const endTime = dayjs(getEndTime.time).format("HH:mm:ss");
      const endDateTime = `${endDate}T${endTime}Z`;
      const createModel: Discount.DiscountModel = {
        ...model,
        startTime: combinedDateTime,
        endTime: endDateTime,
      };
      const modelEdit: Discount.DiscountModel = {
        ...model,
        id: selectedData?.id,
        startTime: combinedDateTime,
        endTime: endDateTime,
      };
      if (type === "Create") {
        const { result, errorCode, message } =
          await service.discount.createDiscount(createModel);
        if (errorCode === 1) {
          notification.error(message);
        } else {
          await uploadPhotoRef.current?.handleSubmitImage(result?.id);
          notification.success("Tạo thành công.");
        }
      } else {
        const { result, errorCode, message } =
          await service.discount.updateDiscount(modelEdit);
        if (errorCode === 1) {
          notification.error(message);
        } else {
          await uploadPhotoRef.current?.handleSubmitImage(
            selectedData?.id ?? result?.id
          );
          notification.success("Sửa thành công.");
        }
      }
      getListDiscount();
      getDiscountNotice();
      form.resetFields();
      setIsDirty(false);
      setIsOpenPanel(false);
      setShowMessage(false);
      setValues({
        ...values,
        imageSrc: "",
        imageFile: undefined,
      });
      setPreviewUrl("");
      closeLoading("CreateDiscount");
    } catch (error) {
      closeLoading("CreateDiscount");
    }
  };

  const handleDiscard = () => {
    form.resetFields();
    setIsDirty(false);
    setIsOpenPanel(false);
    setIsModalVisible(false);
    setShowMessage(false);
    setValues({
      ...values,
      imageSrc: "",
      imageFile: undefined,
    });
    setPreviewUrl("");
  };

  const handleStay = () => {
    setIsModalVisible(false);
  };

  const filterOption = (input: string, option?: IOptionValue) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
    ((option as any)?.email || "").toLowerCase().includes(input.toLowerCase());

  const checkStartTime = (_: any, value: { date?: string; time?: string }) => {
    if (
      !value?.date ||
      !dayjs(value?.date).isValid() ||
      !value?.time ||
      !dayjs(value?.time).isValid()
    ) {
      return Promise.reject(new Error("Vui lòng điền thời gian bắt đầu."));
    }
    return Promise.resolve();
  };

  const onStartTimeChange = () => {
    const getEndTime = form.getFieldValue("endTime");
    if (getEndTime?.date && getEndTime?.time) {
      form.validateFields(["endTime"]);
    }
  };

  const checkEndTime = async (_: A, value: { date: string; time: string }) => {
    const getStartTime = form.getFieldValue("startTime");
    const startDate = dayjs(getStartTime?.date).formatDay();
    const startTime = dayjs(getStartTime?.time).formatTime();
    const startDateTime = dayjs(`${startDate} ${startTime}`).formatDayAndTime();
    const enddate = dayjs(value?.date).formatDay();
    const endtime = dayjs(value?.time).formatTime();
    const endDateTime = dayjs(`${enddate} ${endtime}`);
    const diffDate = dayjs(endDateTime).diff(dayjs(startDateTime), "minutes");
    if (
      value?.date &&
      dayjs(value?.date).isValid() &&
      value?.time &&
      dayjs(value?.time).isValid()
    ) {
      if (isNaN(diffDate)) {
        setIsEndBeforeStart(false);
        return Promise.resolve();
      } else if (!(diffDate > 0)) {
        setIsEndBeforeStart(true);
        return Promise.reject(
          new Error("Cụ nhập thời gian kết thúc nhỏ hơn thời gian bắt đầu.")
        );
      } else {
        setIsEndBeforeStart(false);
        return Promise.resolve();
      }
    } else {
      setIsEndBeforeStart(false);
    }

    return Promise.reject(new Error("Vui lòng điền thời gian kết thúc."));
  };

  return (
    <div>
      <Drawer
        title={
          <span style={{ color: "#12161B" }}>{`${
            type === "View"
              ? "Xem Khuyến Mãi"
              : type === "Create"
              ? "Tạo Khuyến Mãi"
              : "Sửa Khuyến Mãi"
          }`}</span>
        }
        destroyOnClose
        open={isOpen}
        placement="right"
        maskClosable={false}
        closable={false}
        extra={<CloseOutlined onClick={handleClose} />}
        footer={
          <div>
            <Button style={{ marginRight: "8px" }} onClick={handleClose}>
              Đóng
            </Button>
            {type === "Create" ? (
              <Button type="primary" onClick={handleSubmit}>
                Tạo Khuyến Mãi
              </Button>
            ) : (
              type === "Edit" && (
                <Button type="primary" onClick={handleSubmit}>
                  Sửa Khuyến Mãi
                </Button>
              )
            )}
          </div>
        }
        width={isMobile ? "90%" : 520}
      >
        {type === "Create" || type === "Edit" ? (
          <Form layout="vertical" form={form} onValuesChange={handleFormChange}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng điền mã giảm giá." },
              ]}
              name="title"
              label="Tên khuyến mãi:"
            >
              <TextArea maxLength={2000} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số tiền giảm.",
                },
              ]}
              name="discountNumber"
              label="Số tiền giảm:"
            >
              <Select
                rootClassName={styles.emFilterSelectMultiple}
                placeholder="Chọn loại số tiền"
                options={optionMoney}
                showSearch
                filterOption={filterOption}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mô tả .",
                },
              ]}
              name="description"
              label="Mô tả:"
            >
              <TextArea maxLength={2000} />
            </Form.Item>

            <Form.Item
              name="startTime"
              label="Thời gian bắt đầu:"
              rules={[{ validator: checkStartTime }]}
            >
              <DateAndTime
                onChange={onStartTimeChange}
                dateStatusError={isEndBeforeStart}
                timeStatusError={isEndBeforeStart}
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  validator: checkEndTime,
                },
              ]}
              name="endTime"
              label="Thời gian kết thúc:"
            >
              <DateAndTime
                dateStatusError={isEndBeforeStart}
                // onChange={onEndTimeChange}
                timeStatusError={isEndBeforeStart}
                endDateTime={form.getFieldValue("endTime")}
              />
            </Form.Item>
            <UploadPhoto
              ref={uploadPhotoRef}
              values={values}
              setValues={setValues}
              showMessage={showMessage}
              setShowMessage={setShowMessage}
              initialFieldValues={initialFieldValues}
              selectedData={selectedData}
              type={type}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          </Form>
        ) : (
          <div>
            <TextItem label="Khuyến mãi" textItemProps={{ isCol: false }}>
              {selectedData?.title}
            </TextItem>
            <TextItem label="Số tiền giảm" textItemProps={{ isCol: false }}>
              {selectedData?.discountTitle}
            </TextItem>
            <TextItem label="Ngày bắt đầu" textItemProps={{ isCol: false }}>
              {dayjs(selectedData?.startTime).format("DD/MM/YYYY HH:mm")}
            </TextItem>
            <TextItem label="Ngày kết thúc" textItemProps={{ isCol: false }}>
              {dayjs(selectedData?.endTime).format("DD/MM/YYYY HH:mm")}
            </TextItem>
            <TextItem label="Trạng thái" textItemProps={{ isCol: false }}>
              <Status
                data={EEventStatusProperties}
                label={selectedData?.status ?? 1}
              ></Status>
            </TextItem>
            <TextItem label="Mô tả" textItemProps={{ isCol: false }}>
              {selectedData?.description}
            </TextItem>
            <TextItem label="Thời gian tạo" textItemProps={{ isCol: false }}>
              {dayjs(selectedData?.createAt).format("DD/MM/YYYY HH:mm")}
            </TextItem>
            <TextItem label="Thời gian sửa" textItemProps={{ isCol: false }}>
              {dayjs(selectedData?.updateAt).format("DD/MM/YYYY HH:mm")}
            </TextItem>
            <TextItem label="Thời gian sửa" textItemProps={{ isCol: false }}>
              <div className={styles.wrapperImage}>
                <ViewImage
                  isPreview={true}
                  keyImage={selectedData?.fileInforImage?.keyImage ?? ""}
                  isHeight40={false}
                />
              </div>
            </TextItem>
          </div>
        )}
      </Drawer>
      <ModalDiscard
        openModal={isModalVisible}
        handleDiscard={handleDiscard}
        handleStay={handleStay}
      />
    </div>
  );
};

export default forwardRef(CreateDiscountPanel);
