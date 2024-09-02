import { BaseModel } from "./BaseModel";

declare namespace DiscountCode {
  export interface DiscountCodeModel extends BaseModel {
    title?: string;
    discountCodeNumber?: string;
    discountCodeTitle?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    status?: number;
  }

  export interface MoneyFilterOptionModel {
    value?: string;
    label?: string;
    money?: number;
  }

  export interface DiscountCodeFilterModel {
    status: number[];
    moneyFilters: MoneyFilterOptionModel[];
  }

  export interface DiscountCodeOverViewModel {
    value?: number;
    status?: string;
    listStatus?: string[];
  }
}
