export enum ErrorCode {
  Unknow = 0,
  CookieIsExpired = 3,
  RepeatedLogin = 4,
  CookieIsDiscarded = 5,
  NotExist = 17,
  NopermissionCode = 22,
  EdhErrorCode = 25,
  FrontendCancel = 44947,
  FrontendTimeOUt = 44944
}

const checkIsCancelError = (error: A) => {
  return error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError';
};
const parsingStatusCode = (error: A) => {
  const isCancelError = checkIsCancelError(error);
  if (isCancelError) {
    return {
      code: ErrorCode.FrontendCancel,
      message: 'canceled',
      type: 'request'
    };
  }
  const code = error?.response?.status;
  let result = {};
  switch (code) {
    case 401:
      localStorage.clear();
      sessionStorage.clear();
      location.href = '/login';
      result = error;
      break;
    case 404:
      result = {
        code: ErrorCode.NotExist,
        message: '404',
        type: 'request'
      };
      break;
    case 469:
    case 500:
      result = `An unknown network error has occurred, please clear cookies and refresh the page, code: ${code}.`;
      break;
    default:
      result = {
        code: ErrorCode.FrontendTimeOUt,
        message: error?.message ?? error ?? 'TimeOut',
        type: 'request'
      };
  }
  return result;
};

const useResponseErrorHandle = (error: A) => {
  const result = parsingStatusCode(error);
  return {
    result,
    ErrorCode
  };
};

export default useResponseErrorHandle;
