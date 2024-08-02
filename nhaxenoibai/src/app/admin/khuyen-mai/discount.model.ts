import { Discount } from "@/common/service/models/Discount";

export interface PanelRefDiscount {
  openPanel: (data?: Discount.DiscountModel, type?: string) => void;
}
