import { BaseModel } from "./BaseModel";

declare namespace Discount {
  export interface DiscountModel extends BaseModel {
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    status?: number;
  }
}
