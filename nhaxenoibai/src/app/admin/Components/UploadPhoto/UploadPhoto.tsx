/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Form, Image, Spin } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./UploadPhoto.module.scss";
import { IInitValue, UploadPhotoRef } from "./UploadPhoto.model";
import service from "@/common/service/apis";
import { Discount } from "@/common/service/models/Discount";

interface IUploadPhoto {
  initialFieldValues: IInitValue;
  values: IInitValue;
  setValues: React.Dispatch<React.SetStateAction<IInitValue>>;
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedData?: Discount.DiscountModel;
}

const UploadPhoto = (props: IUploadPhoto, ref: React.Ref<UploadPhotoRef>) => {
  const {
    values,
    setValues,
    showMessage,
    setShowMessage,
    initialFieldValues,
    selectedData,
  } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [previewUrl, setPreviewUrl] = useState("");

  const previousImageFileRef = useRef(values.imageFile);

  useImperativeHandle(ref, () => ({
    handleSubmitImage,
  }));

  const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x?.target?.result as string,
        });
      };

      reader.readAsDataURL(imageFile);
      setShowMessage(false);
      e.target.value = "";
    } else {
      setValues(initialFieldValues);
    }
  };

  const handleDeleteImage = () => {
    setValues({
      ...values,
      imageSrc: "",
      imageFile: undefined, // Clear imageFile as well
    });
  };

  const handleSubmitImage = async (id?: string) => {
    if (values.imageFile !== previousImageFileRef.current) {
      const formData = new FormData();
      formData.append("file", values.imageFile || "");
      formData.append("documentType", "photo");
      formData.append("entity", "discountEntity");
      formData.append("recordId", id ?? "");
      await service.file.uploadFile(formData);
    }
    previousImageFileRef.current = values.imageFile;
  };

  const getPreviewImage = async () => {
    try {
      setLoading(true);
      const model = {
        key: selectedData?.fileInforImage?.keyImage,
      };
      const file = await service.file.getFilePreview(model);
      setPreviewUrl(file);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPreviewImage();
  }, [selectedData]);

  return (
    <div>
      <Form layout="vertical">
        <Form.Item name="img" label="Chọn ảnh bìa: ">
          <div className={styles.wrapperImage}>
            <div>
              <label htmlFor="image-uploader">
                <div className={styles.labelImage}>
                  <PlusOutlined />
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="image-uploader"
                onChange={showPreview}
                style={{ display: "none" }}
              />
            </div>

            <div>
              <div className={styles.imageChoose}>
                <div>
                  <Spin spinning={loading}>
                    {loading ? (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          border: "1px solid black",
                          borderRadius: "4px",
                        }}
                      ></div>
                    ) : (
                      <Image
                        rootClassName={styles.images}
                        preview={{
                          visible: previewOpen,
                          movable: false,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) =>
                            !visible && setPreviewOpen(false),
                        }}
                        src={previewUrl}
                      />
                    )}
                  </Spin>
                </div>
                <div onClick={handleDeleteImage} className={styles.icon}>
                  <DeleteOutlined />
                </div>
              </div>
            </div>
          </div>
          {showMessage && (
            <div className={styles.message}>Vui lòng chọn ảnh.</div>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default forwardRef(UploadPhoto);
