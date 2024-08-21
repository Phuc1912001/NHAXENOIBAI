import { BaseModel } from "./BaseModel";

declare namespace Price {
  export interface PriceModel extends BaseModel {
    carType?: string;
    fromHanoiToNoiBai?: string;
    fromNoiBaiToHanoi?: string;
    toWay?: string;
    moneyKm?: string;
    money?: number;
    moneyTitle?: string;
  }
}
