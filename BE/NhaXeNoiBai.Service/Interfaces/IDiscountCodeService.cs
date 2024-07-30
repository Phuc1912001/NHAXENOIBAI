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

        Task<DiscountCodeModel> CreateDiscountCode(DiscountCodeModel discountCode);
        Task<DiscountCodeModel> UpdateDiscountCode(DiscountCodeModel discountCode);
        Task<bool> DeleteDiscountCode(Guid  id);
        Task UpdateExpiredDiscountCodesAsync();

    }
}
