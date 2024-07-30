using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Interfaces
{
    public interface IDiscountCodeRepositoryService
    {
        Task<BaseDataCollection<DiscountCodeEntity>> GetListDiscountCode(DataGridModel model);
        Task<DiscountCodeFilterModel> GetListFilterDiscountCode();

        Task<DiscountCodeEntity> CreateDiscountCode(DiscountCodeEntity entity);
        Task<DiscountCodeEntity> UpdateDiscountCode(DiscountCodeEntity entity);
        Task<bool> DeleteDiscountCode(Guid id);
        Task<List<DiscountCodeEntity>> GetExpiredDiscountCodesAsync();
        Task<List<DiscountCodeEntity>> GetActiveDiscountCodesAsync();
        Task UpdateDiscountCodeAsync(DiscountCodeEntity discountCode);
    }
}
