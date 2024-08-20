declare namespace DiscountChart {
  export interface DiscountChartModel {
    legenData: String[];
    seriesDatas: SeriesData[];
  }
  export interface SeriesData {
    value?: number;
    name?: string;
  }
}
