using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Interfaces
{
    public interface IDiscountCodeService
    {
        Task<BaseDataCollection<DiscountCodeModel>> GetListDiscountCode(DataGridModel model);
        Task<DiscountCodeModel> FindDiscountCode(string title);

        Task<DiscountCodeFilterModel> GetListFilterDiscountCode();
        Task<DiscountCodeModel> CreateDiscountCode(DiscountCodeModel discountCode);
        Task<DiscountCodeModel> UpdateDiscountCode(DiscountCodeModel discountCode);
        Task<bool> DeleteDiscountCode(Guid  id);
        Task UpdateExpiredDiscountCodesAsync();
        Task<DiscountChartModel> GetDiscountCodeChart();


    }
}
