import axiosInstance from "../axios-instance/index";
import { DiscountCode } from "../models/DiscountCode";

export const discountCode = {
  async createDiscount(
    discountCode: DiscountCode.DiscountCodeModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        "/DiscountCode/CreateDiscountCode",
        discountCode
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getDiscountCodeList(
    model?: Common.DataGridModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        `/DiscountCode/GetListDiscountCode`,
        model
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async updateDiscountCode(
    discountCode: DiscountCode.DiscountCodeModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        `/DiscountCode/UpdateDiscountCode`,
        discountCode
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async DeleteDiscountCode(id: string): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.delete(`/DiscountCode/${id}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async GetFilterDiscountCode() {
    try {
      const response = await axiosInstance.get(
        `/DiscountCode/GetFilterDiscountCode`
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },
};
