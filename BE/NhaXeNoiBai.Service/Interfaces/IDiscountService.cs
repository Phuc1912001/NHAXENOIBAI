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
        Task<DiscountModel> CreateDiscount(DiscountModel discountModel);
        Task<DiscountModel> UpdateDiscount(DiscountModel discountModel);
    }
}
