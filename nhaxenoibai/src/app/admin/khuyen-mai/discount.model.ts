import { Discount } from "@/common/service/models/Discount";

export interface PanelRef {
  openPanel: (data?: Discount.DiscountModel, type?: string) => void;
}
