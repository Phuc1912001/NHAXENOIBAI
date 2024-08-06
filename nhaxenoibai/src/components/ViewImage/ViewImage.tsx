/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import service from "@/common/service/apis";
import { Image, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ViewImage.module.scss";

interface IViewImage {
  keyImage: string;
  isPreview: boolean;
  isHeight40: boolean;
}

const ViewImage = (props: IViewImage) => {
  const { keyImage, isPreview, isHeight40 } = props;
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const getPreviewImage = async () => {
    try {
      setLoading(true);
      const model = {
        key: keyImage,
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
  }, [keyImage]);
  return (
    <span className={styles.wrapperViewImg}>
      <Spin spinning={loading}>
        {loading ? (
          <div className={isHeight40 ? styles.height40 : styles.hetght80}></div>
        ) : (
          <div className={styles.wrapperImage}>
            <Image
              rootClassName={isHeight40 ? styles.images : styles.images80}
              preview={
                isPreview
                  ? {
                      visible: previewOpen,
                      movable: false,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewOpen(false),
                    }
                  : false
              }
              src={previewUrl}
            />
          </div>
        )}
      </Spin>
    </span>
  );
};

export default ViewImage;
