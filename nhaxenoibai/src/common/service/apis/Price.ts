import axiosInstance from "../axios-instance/index";
import { Price } from "../models/Price";

export const price = {
  async createPrice(
    priceData: Price.PriceModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        "/Price/CreatePrice",
        priceData
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getPriceList(
    model?: Common.DataGridModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(`/Price/GetListPrice`, model);
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async getFullPriceList(): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.get(`/Price`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async UpdatePrice(
    priceData: Price.PriceModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        "/Price/UpdatePrice",
        priceData
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async DeletePrice(id: string): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.delete(`/Price/${id}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },
};
