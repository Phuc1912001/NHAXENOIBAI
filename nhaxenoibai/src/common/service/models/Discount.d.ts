import { BaseModel } from "./BaseModel";

declare namespace Discount {
  export interface DiscountModel extends BaseModel {
    title?: string;
    description?: string;
    StartTime?: string;
    EndTime?: string;
    Status?: number;
  }
}
