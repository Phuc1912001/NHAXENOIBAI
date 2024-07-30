import { Money } from "@/common/service/models/Money";

export interface PanelRefMoney {
  openPanel: (data?: Money.MoneyModel, type?: string) => void;
}
