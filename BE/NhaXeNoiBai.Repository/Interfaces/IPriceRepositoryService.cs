using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Interfaces
{
    public interface IPriceRepositoryService
    {
        Task<BaseDataCollection<PriceEntity>> GetListPrice(DataGridModel model);
        Task<PriceEntity> CreatePrice(PriceEntity price);
        Task<PriceEntity> UpdatePrice(PriceEntity price);
        Task<bool> DeletePrice(Guid id);

    }
}
