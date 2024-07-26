declare namespace Response {
  type ResponseState = 0 | 1;

  export interface IDefaultResponse {
    state?: ResponseState;
    statusCode?: number;
    message?: string;
    result?: A;
    prameter?: A;
  }
}
declare type A = any;
