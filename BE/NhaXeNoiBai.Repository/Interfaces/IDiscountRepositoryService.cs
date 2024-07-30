using NhaXeNoiBai.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Interfaces
{
    public interface IDiscountRepositoryService
    {
        Task<DiscountEntity> CreateDiscount(DiscountEntity entity);
        Task<DiscountEntity> UpdateDiscount(DiscountEntity entity);
    }
}
