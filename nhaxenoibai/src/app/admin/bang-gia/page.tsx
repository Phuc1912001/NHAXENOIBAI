"use client";
import {
  CloseOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Affix, Button, Popover } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import CreatePricePanel from "./components/CreatePricePanel/CreatePricePanel";
import { Price } from "@/common/service/models/Price";
import { useLoading } from "@/common/context/useLoading";
import service from "@/common/service/apis";
import TablePriceList from "./components/TablePriceList/TablePriceList";
import { PanelRef } from "./priceList.model";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import { useNotification } from "@/components/Notification/useNotification";
import MobileHeader from "../Components/MobileHeader/MobileHeader";
import Search from "antd/es/input/Search";
import styles from "./priceList.module.scss";
import TablePriceListMobile from "./components/TablePriceListMobile/TablePriceListMobile";
import { useDevice } from "@/common/context/useDevice";
import { EDeviceType } from "@/common/enum/EDevice";
import TabBar from "../Components/TabBar/TabBar";

const Page = () => {
  const { showLoading, closeLoading } = useLoading();
  const [dataPrice, setDataPrice] = useState<Price.PriceModel[]>([]);
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const panelRef = useRef<PanelRef>(null);
  const [currentRecord, setCurrentRecord] = useState<Price.PriceModel>();
  const [mobileSearch, setMobileSearch] = useState<boolean>(false);

  const notification = useNotification();

  const paramInitial: Common.DataGridModel = {
    pageInfo: {
      pageSize: 10,
      pageNo: 1,
      total: 0,
    },
    searchInfo: {
      searchOperator: 0,
      searchRule: [
        {
          keyWord: "",
          searchColumns: [],
        },
      ],
    },
  };
  const [param, setParam] = useState<Common.DataGridModel>(paramInitial);
  const { type } = useDevice();
  const isMobile = type === EDeviceType.Mobile;
  const getListPrice = useCallback(async () => {
    try {
      showLoading("GetlistPrice");
      const { result } = await service.price.getPriceList(param);
      setDataPrice(result?.baseDatas);
      setTotalRecordCount(result?.totalRecordCount);
      setCurrentPage(result?.pageIndex);
      closeLoading("GetlistPrice");
    } catch (error) {
      closeLoading("GetlistPrice");
    }
  }, [param, showLoading, closeLoading]);

  useEffect(() => {
    getListPrice();
  }, [getListPrice]);

  const nameSearch = async (value: string) => {
    const dataGridFilter = { ...param };
    if (dataGridFilter.searchInfo && dataGridFilter.pageInfo) {
      dataGridFilter.pageInfo.pageNo = 1;
      dataGridFilter.searchInfo.searchRule = [
        { keyWord: value.trim(), searchColumns: ["Title"] },
      ];
      setParam(dataGridFilter);
    }
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
    setParam((currentParam) => {
      return {
        ...currentParam,
        pageInfo: {
          ...currentParam.pageInfo,
          pageNo: page,
          pageSize: 10,
          total: totalRecordCount,
        },
      };
    });
  };
  const openPanel = (data?: A, type?: string) => {
    panelRef.current?.openPanel(data, type);
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const handleOpenModal = (data?: Price.PriceModel) => {
    setShowModalDelete(true);
    setCurrentRecord(data);
  };

  const handleConfirmDelete = async () => {
    try {
      showLoading("DeleteCarType");
      await service.price.DeletePrice(currentRecord?.id ?? "");
      setShowModalDelete(false);
      getListPrice();
      notification.success("Xóa thành công.");
      closeLoading("DeleteCarType");
    } catch (error) {
      closeLoading("DeleteCarType");
    }
  };

  return (
    <div>
      {!mobileSearch ? (
        <MobileHeader title="Bảng giá">
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            onClick={() => openPanel()}
          />

          <Button
            type="text"
            onClick={() => {
              setMobileSearch((prev) => !prev);
            }}
          >
            <SearchOutlined className={styles.iconSearch} />
          </Button>
        </MobileHeader>
      ) : (
        <Affix offsetTop={0}>
          <div className={styles.mobileSearchWrapper}>
            <div className={styles.searchText}>
              <Popover
                placement="bottom"
                content={
                  <div>
                    <p>Tìm kiếm theo giá xe nhé</p>
                  </div>
                }
                trigger="hover"
              >
                <Search
                  placeholder={"tìm kiếm đê"}
                  onSearch={nameSearch}
                  size="large"
                  allowClear
                />
              </Popover>
            </div>
            <div
              onClick={() => {
                setMobileSearch((prev) => !prev);
              }}
            >
              <div className={styles.closeSearchBox}>
                <CloseOutlined />
              </div>
            </div>
          </div>
        </Affix>
      )}

      <div className={styles.wrapperContent}>
        <div className={styles.tabBarPc}>
          <TabBar
            openPanel={openPanel}
            btnText="Tạo giá xe"
            placeholderSearch="Nhập giá xe"
            onSearch={nameSearch}
            hasFilter={false}
          />
        </div>
        {isMobile ? (
          <div className={styles.tableMobile}>
            <TablePriceListMobile
              openPanel={openPanel}
              data={dataPrice}
              currentPage={currentPage}
              totalRecordCount={totalRecordCount}
              setPage={setPage}
              handleOpenModal={handleOpenModal}
            />
          </div>
        ) : (
          <div className={styles.tablePC}>
            <TablePriceList
              openPanel={openPanel}
              listPrice={dataPrice}
              currentPage={currentPage}
              totalRecordCount={totalRecordCount}
              setPage={setPage}
              handleOpenModal={handleOpenModal}
            />
          </div>
        )}

        <CreatePricePanel ref={panelRef} getListPrice={getListPrice} />
        <ModalDelete
          title="Xóa Loại Xe"
          openModal={showModalDelete}
          btnText="Xóa Loại Xe"
          handleCancel={handleCancelDelete}
          handleDelete={handleConfirmDelete}
          content={`Bạn có muốn xóa loại xe ${currentRecord?.carType}.`}
        />
      </div>
    </div>
  );
};

export default Page;
