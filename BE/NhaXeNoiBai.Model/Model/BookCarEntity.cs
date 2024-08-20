using NhaXeNoiBai.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class BookCarEntity : BaseEntity
    {
        public string? Origin { get; set; }
        public string? Destination { get; set; }

        public string? Duration { get; set; }
        public int? Distantce { get; set; }
        public bool? TwoWay { get; set; }
        public string? Cartype { get; set; }

        public DateTime? StartTime { get; set; }

        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Note { get; set; }   
        public string? DiscountCode { get; set; }
        public int? TotalNumber { get; set; }
        public int? Status { get; set; }
    }
}
