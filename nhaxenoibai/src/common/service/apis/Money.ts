import axiosInstance from "../axios-instance/index";
import { Money } from "../models/Money";

export const money = {
  async createMoney(
    priceData: Money.MoneyModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        "/Money/CreateMoney",
        priceData
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },
  async updateMoney(
    priceData: Money.MoneyModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        "/Money/UpdateMoney",
        priceData
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getListMoney(
    model?: Common.DataGridModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(`/Money/GetListMoney`, model);
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async DeleteMoney(id: string): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.delete(`/Money/${id}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getFullListMoney(): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.get(`/Money`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },
};
