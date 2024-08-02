"use client";
import { useLoading } from "@/common/context/useLoading";
import service from "@/common/service/apis";
import { Discount } from "@/common/service/models/Discount";
import { DiscountCode } from "@/common/service/models/DiscountCode";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import { useNotification } from "@/components/Notification/useNotification";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import TabBar from "../Components/TabBar/TabBar";
import DiscountCodeFilterPanel from "../ma-giam-gia/components/DiscountCodeFilterPanel/DiscountCodeFilterPanel";
import {
  EDiscountStatus,
  IFilterDiscountCodeValue,
  PanelRefFilter,
} from "../ma-giam-gia/discountCode.model";
import CreateDiscountPanel from "./components/CreateDiscountPanel/CreateDiscountPanel";
import TableListDiscount from "./components/TableListDiscount/TableListDiscount";
import { PanelRefDiscount } from "./discount.model";
import { InfoCircleFilled } from "@ant-design/icons";
import styles from "./discount.module.scss";

const Page = () => {
  const panelRef = useRef<PanelRefDiscount>(null);
  const filterRef = useRef<PanelRefFilter>(null);

  const { showLoading, closeLoading } = useLoading();
  const [dataDiscount, setDataDiscount] = useState<Discount.DiscountModel[]>(
    []
  );
  const openPanel = (data?: A, type?: string) => {
    panelRef.current?.openPanel(data, type);
  };
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Discount.DiscountModel>();
  const notification = useNotification();

  const [dataFilterDiscountCode, setDataFilterDiscountCode] =
    useState<DiscountCode.DiscountCodeFilterModel>();

  const [filterValue, setFilterValue] = useState<IFilterDiscountCodeValue>();

  const [dataNotice, setDataNotice] = useState<Discount.DiscountModel>();

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

  const getListDiscount = useCallback(async () => {
    try {
      showLoading("GetListDiscount");
      const { result } = await service.discount.getDiscountList(param);
      setDataDiscount(result?.baseDatas);
      setTotalRecordCount(result?.totalRecordCount);
      setCurrentPage(result?.pageIndex);
      closeLoading("GetListDiscount");
    } catch (error) {
      closeLoading("GetListDiscount");
    }
  }, [param, showLoading, closeLoading]);

  const getDiscountNotice = async () => {
    try {
      showLoading("GetDiscountNotice");
      const result = await service.discount.getDiscountNotice();
      setDataNotice(result);
      closeLoading("GetDiscountNotice");
    } catch (error) {
      closeLoading("GetDiscountNotice");
    }
  };

  useEffect(() => {
    getDiscountNotice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListDiscount();
  }, [getListDiscount]);

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

  const handleOpenModal = (data?: Discount.DiscountModel) => {
    setShowModalDelete(true);
    setCurrentRecord(data);
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      showLoading("DeleteDiscount");
      await service.discount.deleteDiscount(currentRecord?.id ?? "");
      setShowModalDelete(false);
      getListDiscount();
      getDiscountNotice();
      notification.success("Xóa thành công.");
      closeLoading("DeleteDiscount");
    } catch (error) {
      closeLoading("DeleteDiscount");
    }
  };

  const getFilterDiscount = async () => {
    try {
      showLoading("GetFilterDiscountCode");
      const result = await service.discount.getFilterDiscount();
      setDataFilterDiscountCode(result);
      closeLoading("GetFilterDiscountCode");
    } catch {
      closeLoading("GetFilterDiscountCode");
    }
  };

  const filter = (val: IFilterDiscountCodeValue) => {
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

    if (val?.money?.length !== 0) {
      filterCondition = [
        ...filterCondition,
        {
          values: val?.money?.map(String),
          columnName: "Money",
        },
      ];
      console.log("filterCondition", filterCondition);
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
    getFilterDiscount();
    filterRef.current?.handleOpenPanel();
  };

  return (
    <div>
      <TabBar
        openPanel={openPanel}
        btnText="Tạo Khuyến mãi"
        placeholderSearch="Nhập Khuyến mãi"
        onSearch={nameSearch}
        handleOpenFilter={handleOpenFilter}
      />
      <CreateDiscountPanel
        ref={panelRef}
        getListDiscount={getListDiscount}
        getDiscountNotice={getDiscountNotice}
      />
      {dataNotice?.status === EDiscountStatus.Active && (
        <div className={styles.wrapperNotice}>
          <InfoCircleFilled className={styles.infoIcon} />
          <div className={styles.text}>
            Chú ý trong một khoảng thời gian chỉ duy nhất một chương trình
            khuyến mãi được hoạt động. Hiện tại có khuyến mãi
            <span>{` ${dataNotice.title} `}</span> diễn ra vào ngày
            <span>
              {` ${dayjs(dataNotice.startTime).format("DD/MM/YYYY HH:mm")} `}
            </span>
            đến hết ngày
            <span>{` ${dayjs(dataNotice.endTime).format(
              "DD/MM/YYYY HH:mm"
            )} `}</span>
            .
          </div>
        </div>
      )}

      <TableListDiscount
        openPanel={openPanel}
        listDiscount={dataDiscount}
        currentPage={currentPage}
        totalRecordCount={totalRecordCount}
        setPage={setPage}
        handleOpenModal={handleOpenModal}
      />
      <DiscountCodeFilterPanel
        ref={filterRef}
        filterValue={filterValue}
        dataFilterDiscountCode={dataFilterDiscountCode}
        filter={filter}
      />
      <ModalDelete
        title="Xóa khuyến mãi"
        openModal={showModalDelete}
        btnText="Xóa khuyến mãi"
        handleCancel={handleCancelDelete}
        handleDelete={handleConfirmDelete}
        content={`Bạn có muốn xóa khuyến mãi ${currentRecord?.title}.`}
      />
    </div>
  );
};

export default Page;
