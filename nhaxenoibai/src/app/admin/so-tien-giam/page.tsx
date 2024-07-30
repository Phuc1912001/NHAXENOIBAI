"use client";
import { useLoading } from "@/common/context/useLoading";
import service from "@/common/service/apis";
import { Money } from "@/common/service/models/Money";
import { useNotification } from "@/components/Notification/useNotification";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import CreateMoneyPanel from "./components/CreateMoneyPanel/CreateMoneyPanel";
import TableListMoney from "./components/TableListMoney/TableListMoney";
import { PanelRefMoney } from "./money.model";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import TabBar from "../Components/TabBar/TabBar";

const Page = () => {
  const panelRefMoney = useRef<PanelRefMoney>(null);

  const { showLoading, closeLoading } = useLoading();
  const [dataMoney, setDataMoney] = useState<Money.MoneyModel[]>([]);
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Money.MoneyModel>();

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
  const getListMoney = useCallback(async () => {
    try {
      showLoading("GetListMoney");
      const { result } = await service.money.getListMoney(param);
      setDataMoney(result?.baseDatas);
      setTotalRecordCount(result?.totalRecordCount);
      setCurrentPage(result?.pageIndex);
      closeLoading("GetListMoney");
    } catch (error) {
      closeLoading("GetListMoney");
    }
  }, [param, showLoading, closeLoading]);

  useEffect(() => {
    getListMoney();
  }, [getListMoney]);

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
    panelRefMoney.current?.openPanel(data, type);
  };
  const handleOpenModal = (data?: Money.MoneyModel) => {
    setShowModalDelete(true);
    setCurrentRecord(data);
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      showLoading("DeleteMoney");
      await service.money.DeleteMoney(currentRecord?.id ?? "");
      setShowModalDelete(false);
      getListMoney();
      notification.success("Xóa thành công.");
      closeLoading("DeleteMoney");
    } catch (error) {
      closeLoading("DeleteMoney");
    }
  };
  return (
    <div>
      <TabBar
        openPanel={openPanel}
        btnText="Tạo số tiền"
        placeholderSearch="Nhập số tiền"
        onSearch={nameSearch}
      />
      <TableListMoney
        openPanel={openPanel}
        listMoney={dataMoney}
        currentPage={currentPage}
        totalRecordCount={totalRecordCount}
        setPage={setPage}
        handleOpenModal={handleOpenModal}
      />
      <CreateMoneyPanel ref={panelRefMoney} getListMoney={getListMoney} />
      <ModalDelete
        title="Xóa số tiền"
        openModal={showModalDelete}
        btnText="Xóa số tiền"
        handleCancel={handleCancelDelete}
        handleDelete={handleConfirmDelete}
        content={`Bạn có muốn xóa só tiền ${currentRecord?.title}.`}
      />
    </div>
  );
};

export default Page;
