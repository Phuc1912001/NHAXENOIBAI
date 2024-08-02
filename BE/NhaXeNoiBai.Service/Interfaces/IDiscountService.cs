using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Interfaces
{
    public interface IDiscountService
    {
        Task<BaseDataCollection<DiscountModel>> GetListDiscount(DataGridModel model);
        Task<DiscountCodeFilterModel> GetListFilterDiscount();
        Task<DiscountModel> GetDiscountNotice();

        Task<DiscountModel> CreateDiscount(DiscountModel discountModel);
        Task<DiscountModel> UpdateDiscount(DiscountModel discountModel);

        Task<bool> DeleteDiscount(Guid id);
        Task UpdateExpiredDiscountAsync();

    }
}
