using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Entities
{
    public class PriceEntity : BaseEntity
    {
        public string? CarType { get; set; }
        public string? FromHanoiToNoiBai { get; set; }
        public string? FromNoiBaiToHanoi { get; set; }
        public string? ToWay { get; set; }
    }
}
