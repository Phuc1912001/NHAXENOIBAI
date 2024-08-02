import axiosInstance from "../axios-instance/index";
import { Discount } from "../models/Discount";

export const discount = {
  async createDiscount(
    discount: Discount.DiscountModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        "/Discount/CreateDiscount",
        discount
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getDiscountList(
    model?: Common.DataGridModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        `/Discount/GetListDiscount`,
        model
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async updateDiscount(
    discount: Discount.DiscountModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        `/Discount/UpdateDiscount`,
        discount
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async deleteDiscount(id: string): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.delete(`/Discount/${id}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getFilterDiscount() {
    try {
      const response = await axiosInstance.get(`/Discount/getFilterDiscount`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },
  async getDiscountNotice() {
    try {
      const response = await axiosInstance.get(`/Discount/getNotice`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },
};
