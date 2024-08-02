using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Exceptions
{
    public class BaseException : Exception
    {
        public int ErrorCode { get; set; }
        protected BaseException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
        public BaseException(string message) : base(message)
        {
            ErrorCode = (int)Enums.ErrorCode.Unknow;
        }
        public BaseException(string message, int errorCode) : base(message)
        {
            ErrorCode = errorCode;
        }

        public BaseException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
