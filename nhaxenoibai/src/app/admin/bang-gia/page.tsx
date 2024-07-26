"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import CreatePricePanel from "./components/CreatePricePanel/CreatePricePanel";
import { Price } from "@/common/service/models/Price";
import { useLoading } from "@/common/context/useLoading";
import service from "@/common/service/apis";
import TablePriceList from "./components/TablePriceList/TablePriceList";
import { PanelRef } from "./priceList.model";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import { useNotification } from "@/components/Notification/useNotification";

const Page = () => {
  const { showLoading, closeLoading } = useLoading();
  const [dataPrice, setDataPrice] = useState<Price.PriceModel[]>([]);
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const panelRef = useRef<PanelRef>(null);
  const [currentRecord, setCurrentRecord] = useState<Price.PriceModel>();

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
      <Button icon={<PlusCircleOutlined />} onClick={() => openPanel()}>
        Tạo Giá Xe
      </Button>
      <TablePriceList
        openPanel={openPanel}
        listPrice={dataPrice}
        currentPage={currentPage}
        totalRecordCount={totalRecordCount}
        setPage={setPage}
        handleOpenModal={handleOpenModal}
      />
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
  );
};

export default Page;
