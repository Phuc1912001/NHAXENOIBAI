import axiosInstance from "../axios-instance/index";
import { BookCar } from "../models/BookCarModel";

export const bookCar = {
  async createBookCar(
    bookCarData: BookCar.BookCarModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        "/BookCar/createBookCar",
        bookCarData
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getListBookCar(
    model?: Common.DataGridModel
  ): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post(
        `/BookCar/GetListBookCar`,
        model
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while retrieving the customer:", error);
      throw error;
    }
  },

  async deleteBookCar(id: string): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.delete(`/BookCar/${id}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getFilterBookCar() {
    try {
      const response = await axiosInstance.get(`/BookCar/getFilterBookCar`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getBookCarOverview() {
    try {
      const response = await axiosInstance.get(`/BookCar/getBookCarOverview`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async getCustomer() {
    try {
      const response = await axiosInstance.get(`/BookCar/getCustomer`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },
};
