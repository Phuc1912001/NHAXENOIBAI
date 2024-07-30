using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Entities
{
    public class DiscountEntity:BaseEntity
    {
        public string? Title { get; set; }
        public string? DiscountNumber { get; set; }
        public string? Description { get; set; }    
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set;}
        public int? Status { get; set; }
    }
}
