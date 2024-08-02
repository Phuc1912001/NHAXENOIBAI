using Microsoft.AspNetCore.Mvc;
using NhaXeNoiBai.Model.Enums;
using NhaXeNoiBai.Model.Exceptions;
using NhaXeNoiBai.Model.Model;

namespace NhaXeNoiBai.Service.Extend
{
    public static class ExtendController
    {
        public static async Task<BaseResponse<T>> Handle<T>(this ControllerBase controller, ILogger logger, Func<Task<T>> method)
        {
            var result = new BaseResponse<T>();
            try
            {
                var data = await method();
                result.Result = data;
                result.State = ResponseState.Ok;
                result.Message = "";

            }
            catch (Exception ex)
            {

                logger.LogError(ex.Message);

                return new BaseResponse<T>
                {
                    State = ResponseState.Error,
                    Message = ex.Message,
                    ErrorCode = (int)GetErrorCode(ex)
                };

            }
            return result;
        }

        private static ErrorCode GetErrorCode(Exception e)
        {
            if (e is BaseException ex)
            {
                return (ErrorCode)ex.ErrorCode;
            }
            return ErrorCode.Unknow;
        }
    }
}
