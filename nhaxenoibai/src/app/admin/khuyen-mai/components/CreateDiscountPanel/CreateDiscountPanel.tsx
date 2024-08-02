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
        startTime: dayjs(data.startTime),
        endTime: dayjs(data.endTime),
      };

      form.setFieldsValue(dataDiscountCode);
      setSelectedData(data);
      setValues({
        ...values,
        imageSrc: data.fileInforImage?.imageSrc,
      });
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
    }
  };

  const handleSubmit = async () => {
    try {
      showLoading("CreateDiscount");
      let isValid = true;

      if (!values.imageSrc) {
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
      const createModel: Discount.DiscountModel = {
        ...model,
        startTime: dayjs(model.startTime).format(),
        endTime: dayjs(model.endTime).format(),
      };
      const modelEdit: Discount.DiscountModel = {
        ...model,
        id: selectedData?.id,
        startTime: dayjs(model.startTime).format(),
        endTime: dayjs(model.endTime).format(),
      };

      if (type === "Create") {
        const { result, errorCode } = await service.discount.createDiscount(
          createModel
        );
        await uploadPhotoRef.current?.handleSubmitImage(result?.id);
        if (errorCode === 1) {
          notification.error(result.message);
        } else {
          notification.success("Tạo thành công.");
        }
      } else {
        const { result, errorCode } = await service.discount.updateDiscount(
          modelEdit
        );
        await uploadPhotoRef.current?.handleSubmitImage(
          selectedData?.id ?? result?.id
        );

        if (errorCode === 1) {
          notification.error(result.message);
        } else {
          notification.success("Sửa thành công.");
        }
      }

      getListDiscount();
      getDiscountNotice();
      form.resetFields();
      setIsDirty(false);
      setIsOpenPanel(false);
      setShowMessage(false);
    } catch (error) {
      // Optionally handle specific errors here
    } finally {
      closeLoading("CreateDiscount");
    }
  };

  const handleDiscard = () => {
    form.resetFields();
    setIsDirty(false);
    setIsOpenPanel(false);
    setIsModalVisible(false);
    setShowMessage(false);
  };

  const handleStay = () => {
    setIsModalVisible(false);
  };

  const filterOption = (input: string, option?: IOptionValue) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
    ((option as any)?.email || "").toLowerCase().includes(input.toLowerCase());

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
        width={520}
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
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền thời gian bắt đầu.",
                },
              ]}
              name="startTime"
              label="Thời gian bắt đầu:"
            >
              <DatePicker
                // format="DD MMM YYYY"
                inputReadOnly={true}
                placeholder="chọn ngày bắt đầu"
                showTime
                showHour
                showMinute
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền thời gian kết thúc.",
                },
              ]}
              name="endTime"
              label="Thời gian kết thúc:"
            >
              <DatePicker
                // format="DD MMM YYYY"
                inputReadOnly={true}
                placeholder="Chọn ngày kết thúc"
                showTime
                showHour
                showMinute
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
