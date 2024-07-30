"use client";
import { useLoading } from "@/common/context/useLoading";
import service from "@/common/service/apis";
import { DiscountCode } from "@/common/service/models/DiscountCode";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import { useNotification } from "@/components/Notification/useNotification";
import { useCallback, useEffect, useRef, useState } from "react";
import TabBar from "../Components/TabBar/TabBar";
import CreateDiscountCodePanel from "./components/CreateDiscountCodePanel/CreateDiscountCodePanel";
import TableDiscountCode from "./components/TableDiscountCode/TableDiscountCode";
import { PanelRefDiscountCode } from "./discountCode.model";

const Page = () => {
  const panelRef = useRef<PanelRefDiscountCode>(null);
  const { showLoading, closeLoading } = useLoading();
  const [dataDiscountCode, setDataDiscountCode] = useState<
    DiscountCode.DiscountCodeModel[]
  >([]);
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] =
    useState<DiscountCode.DiscountCodeModel>();

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

  const openPanel = (data?: A, type?: string) => {
    panelRef.current?.openPanel(data, type);
  };

  const getDiscountCode = useCallback(async () => {
    try {
      showLoading("GetListDiscountCode");
      const { result } = await service.discountCode.getDiscountCodeList(param);
      setDataDiscountCode(result?.baseDatas);
      setTotalRecordCount(result?.totalRecordCount);
      setCurrentPage(result?.pageIndex);
      closeLoading("GetListDiscountCode");
    } catch (error) {
      closeLoading("GetListDiscountCode");
    }
  }, [param, showLoading, closeLoading]);

  useEffect(() => {
    getDiscountCode();
  }, [getDiscountCode]);

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

  const handleOpenModal = (data?: DiscountCode.DiscountCodeModel) => {
    setShowModalDelete(true);
    setCurrentRecord(data);
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      showLoading("DeleteDiscountCode");
      await service.discountCode.DeleteDiscountCode(currentRecord?.id ?? "");
      setShowModalDelete(false);
      getDiscountCode();
      notification.success("Xóa thành công.");
      closeLoading("DeleteDiscountCode");
    } catch (error) {
      closeLoading("DeleteDiscountCode");
    }
  };
  return (
    <div>
      <TabBar
        openPanel={openPanel}
        btnText="Tạo Mã giảm giá"
        placeholderSearch="Nhập mã giảm giá"
        onSearch={nameSearch}
      />
      <TableDiscountCode
        openPanel={openPanel}
        listDiscountCode={dataDiscountCode}
        currentPage={currentPage}
        totalRecordCount={totalRecordCount}
        setPage={setPage}
        handleOpenModal={handleOpenModal}
      />
      <CreateDiscountCodePanel
        ref={panelRef}
        getDiscountCode={getDiscountCode}
      />
      <ModalDelete
        title="Xóa mã giảm"
        openModal={showModalDelete}
        btnText="Xóa mã giảm"
        handleCancel={handleCancelDelete}
        handleDelete={handleConfirmDelete}
        content={`Bạn có muốn xóa mã giảm ${currentRecord?.title}.`}
      />
    </div>
  );
};

export default Page;
