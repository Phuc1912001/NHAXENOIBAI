using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    [DataContract]
    public class BaseResponse<T>
    {
        [DataMember]
        public ResponseState State { get; set; }
        [DataMember]
        public int ErrorCode { get; set; }
        [DataMember]
        public string Message { get; set; } = "Something went wrong. Please try again.";
        [DataMember]
        public T Result { get; set; }
        [DataMember]
        public bool HasPermission { get; set; }
        [DataMember]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Guid? CorrelatedId { get; set; } = null;
        [DataMember]
        public bool IsView { get; set; } = false;
    }
    public enum ResponseState
    {
        Ok = 0,
        Error = 1
    }
}
