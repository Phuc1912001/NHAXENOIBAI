using NhaXeNoiBai.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class MoneyModel:BaseEntity
    {
        public string? Title { get; set; }
        public int? Money { get; set; }
    }
}
