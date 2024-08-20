"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./bookCar.module.scss";
import MobileHeader from "../Components/MobileHeader/MobileHeader";
import { Affix, Button, Popover } from "antd";
import {
  CloseOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import TabBar from "../Components/TabBar/TabBar";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import { useLoading } from "@/common/context/useLoading";
import { BookCar } from "@/common/service/models/BookCarModel";
import { useNotification } from "@/components/Notification/useNotification";
import { useDevice } from "@/common/context/useDevice";
import { EDeviceType } from "@/common/enum/EDevice";
import service from "@/common/service/apis";
import { IFilterBookCarValue, PanelRefFilter } from "./bookCar.model";
import TableListBookCar from "./components/TableListBookCar/TableListBookCar";
import TableListBookCarMobile from "./components/TableListBookCarMobile/TableListBookCarMobile";
import PanelFilterBookCar from "./components/PanelFilterBookCar/PanelFilterBookCar";
import dayjs from "dayjs";

const Page = () => {
  // const panelRef = useRef<PanelRefDiscountCode>(null);
  const filterRef = useRef<PanelRefFilter>(null);
  const [mobileSearch, setMobileSearch] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const [dataBookCar, setDataBookCar] = useState<BookCar.BookCarModel[]>([]);
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<BookCar.BookCarModel>();
  const notification = useNotification();
  const [filterValue, setFilterValue] = useState<IFilterBookCarValue>();

  const [dataFilterBookCar, setDataFilterBookCar] =
    useState<BookCar.BookCarFilterModel>();

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

  const getListBookCar = useCallback(async () => {
    try {
      showLoading("getListBookCar");
      const { result } = await service.bookCar.getListBookCar(param);
      setDataBookCar(result?.baseDatas);
      setTotalRecordCount(result?.totalRecordCount);
      setCurrentPage(result?.pageIndex);
      closeLoading("getListBookCar");
    } catch (error) {
      closeLoading("getListBookCar");
    }
  }, [param, showLoading, closeLoading]);

  const getFilterBookCar = async () => {
    try {
      showLoading("GetFilterBookCar");
      const result = await service.bookCar.getFilterBookCar();
      setDataFilterBookCar(result);
      closeLoading("GetFilterBookCar");
    } catch {
      closeLoading("GetFilterBookCar");
    }
  };

  useEffect(() => {
    getListBookCar();
  }, [getListBookCar]);

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
    if (page !== currentPage) {
      setCurrentPage(page);
      setParam((currentParam) => ({
        ...currentParam,
        pageInfo: {
          ...currentParam.pageInfo,
          pageNo: page,
          pageSize: 10,
          total: totalRecordCount,
        },
      }));
    }
  };

  // Filter
  const filter = (val: IFilterBookCarValue) => {
    let filterCondition: Common.FilterConditionModel[] = [];
    if (val?.status?.length !== 0 && val?.status) {
      filterCondition = [
        ...filterCondition,
        {
          values: val?.status,
          columnName: "Status",
        },
      ];
    } else {
      filterCondition = [...filterCondition];
    }

    filterCondition = [
      ...filterCondition,
      {
        values: val?.dateRange?.map((item) => dayjs(item).format()),
        columnName: "Date Range",
      },
    ];

    setFilterValue(val);
    setParam((currentParam) => {
      return {
        ...currentParam,
        filterInfo: {
          ...currentParam.filterInfo,
          filterCondition: [...filterCondition],
        },
        pageInfo: {
          pageSize: 10,
          pageNo: 1,
          total: 0,
        },
      };
    });
  };

  const handleOpenFilter = () => {
    getFilterBookCar();
    filterRef.current?.handleOpenPanel();
  };

  const handleOpenModal = (data?: BookCar.BookCarModel) => {
    setShowModalDelete(true);
    setCurrentRecord(data);
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      showLoading("DeleteBookCar");
      await service.bookCar.deleteBookCar(currentRecord?.id ?? "");
      setShowModalDelete(false);
      getListBookCar();
      notification.success("Xóa thành công.");
      closeLoading("DeleteBookCar");
    } catch (error) {
      closeLoading("DeleteBookCar");
    }
  };
  return (
    <div>
      {!mobileSearch ? (
        <MobileHeader title="Dat xe">
          <Button
            onClick={handleOpenFilter}
            type="text"
            icon={<FilterOutlined />}
            // style={{ marginRight: "16px" }}
          />
          <Button
            type="text"
            // className={styles.searchWrapper}
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
                    <p>Tìm kiếm theo ten khach hang nhe</p>
                  </div>
                }
                trigger="hover"
              >
                <Search
                  placeholder={"tìm kiếm đê"}
                  // onSearch={nameSearch}
                  // style={{ width: 250 }}
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
            hasCreate={false}
            placeholderSearch="Nhập mã giảm giá"
            onSearch={nameSearch}
            handleOpenFilter={handleOpenFilter}
          />
        </div>
        <div className={styles.tabBarMobile}></div>

        {isMobile ? (
          <div className={styles.tableMobile}>
            <TableListBookCarMobile
              data={dataBookCar}
              currentPage={currentPage}
              totalRecordCount={totalRecordCount}
              setPage={setPage}
              handleOpenModal={handleOpenModal}
            />
          </div>
        ) : (
          <div className={styles.tablePC}>
            <TableListBookCar
              listBookCar={dataBookCar}
              currentPage={currentPage}
              totalRecordCount={totalRecordCount}
              setPage={setPage}
              handleOpenModal={handleOpenModal}
            />
          </div>
        )}

        <PanelFilterBookCar
          ref={filterRef}
          filterValue={filterValue}
          dataFilterBookCar={dataFilterBookCar}
          filter={filter}
        />
        <ModalDelete
          title="Xóa đơn đặt xe"
          btnText="Xóa đơn đặt xe"
          openModal={showModalDelete}
          handleCancel={handleCancelDelete}
          handleDelete={handleConfirmDelete}
          content={`Bạn có muốn xóa đơn của khách hàng ${currentRecord?.fullName}.`}
        />
      </div>
    </div>
  );
};

export default Page;
