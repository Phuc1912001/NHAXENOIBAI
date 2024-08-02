using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Exceptions
{
    [Serializable]
    public class DiscountException : BaseException
    {
        protected DiscountException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
        public DiscountException(string message) : base(message, (int)Enums.ErrorCode.Discount)
        {
        }
    }
}
