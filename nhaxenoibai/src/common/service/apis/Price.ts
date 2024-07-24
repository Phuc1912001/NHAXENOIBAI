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

  async getAllDoctor(
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
};
