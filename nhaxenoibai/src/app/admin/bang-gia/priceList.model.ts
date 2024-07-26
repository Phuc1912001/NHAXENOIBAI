import { Price } from "@/common/service/models/Price";

export interface PanelRef {
  openPanel: (data?: Price.PriceModel, type?: string) => void;
}
