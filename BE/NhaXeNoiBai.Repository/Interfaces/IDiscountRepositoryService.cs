﻿using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Interfaces
{
    public interface IDiscountRepositoryService
    {
        Task<BaseDataCollection<DiscountEntity>> GetListDiscount(DataGridModel model);
        Task<DiscountEntity> CreateDiscount(DiscountEntity entity);
        Task<DiscountEntity> UpdateDiscount(DiscountEntity entity);
        Task<bool> DeleteDiscount(Guid id);
    }
}
