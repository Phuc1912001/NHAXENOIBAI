using NhaXeNoiBai.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class DiscountCodeModel : BaseEntity
    {
        public string? Title { get; set; }
        public string? DiscountCodeNumber { get; set; }
        public string? DiscountCodeTitle { get; set; }
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public int? DiscountCodeMoney { get; set; }
        public int? Status { get; set; }
    }


    public class DiscountCodeViewModel
    {
        public int? Value { get; set; }
        public string? Status { get; set; }
    }
}
