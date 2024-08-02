import axiosInstance from "../axios-instance/index";
import { Discount } from "../models/Discount";

export const file = {
  async uploadFile(uploadFileModel: A) {
    try {
      const response = await axiosInstance.post("/File", uploadFileModel);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  async deleteFile(id: string) {
    try {
      const response = await axiosInstance.delete(`/File/${id}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },

  // async getFilePreview(model: A) {
  //   try {
  //     const response = await axiosInstance.get("/File/preview", model);
  //     return response.data;
  //   } catch (error) {
  //     console.error(
  //       "An error occurred while fetching the file preview:",
  //       error
  //     );
  //     throw error;
  //   }
  // },

  async getFilePreview(model: A) {
    try {
      const response = await axiosInstance.get("/File/preview", {
        params: model,
        responseType: "blob",
      });

      const previewUrl = window.URL.createObjectURL(response.data);
      return previewUrl;
    } catch (error) {
      console.error(
        "An error occurred while fetching the file preview:",
        error
      );
      throw error;
    }
  },
};
