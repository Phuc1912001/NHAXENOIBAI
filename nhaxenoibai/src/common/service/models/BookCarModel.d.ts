import { BaseModel } from "./BaseModel";

declare namespace BookCar {
  export interface BookCarModel extends BaseModel {
    origin?: string;
    destination?: string;
    duration?: string;
    distantce?: number;
    twoWay?: boolean;
    cartype?: string;
    startTime?: string;
    fullName?: string;
    phoneNumber?: string;
    discountCode?: string;
    note?: string;
    totalNumber?: number;
    status?: string;
  }
  export interface BookCarFilterModel {
    status?: number[];
  }

  export interface BookCarOverViewModel {
    value?: number;
    month?: string;
    listDate?: string[];
  }

  export interface CustomerBookCarModel {
    customerName?: number;
    destination?: string;
    phoneNumber?: string[];
  }
}
