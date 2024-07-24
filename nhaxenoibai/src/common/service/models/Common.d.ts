declare namespace Common {
  export interface DataGridModel {
    pageInfo?: PageModel;
    orderInfo?: OrderModel;
    searchInfo?: SearchModel;
    filterInfo?: FilterModel;
  }

  export interface SearchModel {
    searchOperator?: FilterLogicalOperator;
    searchRule?: SearchRule[];
  }
  interface SearchRule {
    keyWord?: string;
    searchColumns?: string[];
  }

  type FilterLogicalOperator = 0 | 1;
  export interface FilterModel {
    filterOperator?: FilterLogicalOperator;
    filterCondition?: FilterConditionModel[];
  }

  interface FilterConditionModel {
    columnName?: string;
    operator?: FilterConditionOperator;
    values?: A[];
    filterStartTime?: DateTime;
    filterEndTime?: DateTime;
    startDateTimeFrom?: DateTime;
    startDateTimeTo?: DateTime;
    endDateTimeFrom?: DateTime;
    endDateTimeTo?: DateTime;
  }
  type FilterConditionOperator =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14;
  interface PageModel {
    pageSize?: number;
    pageNo?: number;
    total?: A;
    start?: number;
  }
  interface OrderModel {
    columnName?: string;
    orderType?: OrderType;
  }
}
