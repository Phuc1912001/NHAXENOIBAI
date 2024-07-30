import { BaseModel } from "./BaseModel";

declare namespace Money {
  export interface MoneyModel extends BaseModel {
    title?: string;
    money?: number;
  }
}
