import { DiscountCode } from "@/common/service/models/DiscountCode";

export interface PanelRefDiscountCode {
  openPanel: (data?: DiscountCode.DiscountCodeModel, type?: string) => void;
}

export enum EDiscountStatus {
  PendingActive = 1,
  Active = 2,
  Expired = 3,
}
export const EEventStatusProperties = {
  [EDiscountStatus.PendingActive]: {
    bgColor: "#e8f5ff",
    color: "#0072d0",
    text: "Chờ hoạt động",
    name: "pending-active",
  },

  [EDiscountStatus.Active]: {
    bgColor: "#f5fff9",
    color: "#00a84e",
    text: "Hoạt động",
    name: "active",
  },

  [EDiscountStatus.Expired]: {
    bgColor: "#fff5f5",
    color: "#d01b1b",
    text: "Hết hạn",
    name: "expired",
  },
};
