using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class DiscountCodeFilterModel
    {
        public List<int?>? Status { get; set; }
        public List<MoneyFilterOptionModel>? MoneyFilters { get; set; }

    }

    public class MoneyFilterOptionModel
    {
        public Guid Value { get; set; }
        public string? Label { get; set; }
        public int? Money { get; set; }
    }
}
