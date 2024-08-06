using NhaXeNoiBai.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class DiscountModel : BaseEntity
    {
        public string? Title { get; set; }
        public string? DiscountNumber { get; set; }
        public string? DiscountTitle { get; set; }
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? Status { get; set; }
        public FileInforImage? FileInforImage { get; set; }

    }

    public class FileInforImage
    {
        public string? ImageSrc {  set; get; }  
        public string? KeyImage { set; get; }
           
    }

   
}
