import { BaseModel } from "./BaseModel";

declare namespace Discount {
  export interface DiscountModel extends BaseModel {
    title?: string;
    discountNumber?: string;
    discountTitle?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    status?: number;
    fileInforImage?: FileInforImage;
  }

  export interface FileInforImage {
    imageSrc?: string;
    keyImage?: string;
  }

  export interface DiscountOverViewModel {
    value?: number;
    status?: string;
    listStatus?: string[];
  }
}
