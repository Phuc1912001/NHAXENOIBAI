using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class DiscountChartModel
    {
        public List<string?>? LegenData { get; set; }
        public List<SeriesData>? SeriesDatas { get; set; }
    }

    public class SeriesData
    {
        public int? Value { get; set; }
        public string? Name { get; set; }   
    }
}
