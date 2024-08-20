import axiosInstance from "../axios-instance/index";

export const discountChart = {
  async getFilterDiscount() {
    try {
      const response = await axiosInstance.get(`/Discount/getDiscountChart`);
      return response.data;
    } catch (error) {
      console.error("An error occurred while adding the account:", error);
      throw error;
    }
  },
};
