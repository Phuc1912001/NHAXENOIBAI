using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Interfaces
{
    public interface IPriceService
    {
        Task<BaseDataCollection<PriceModel>> GetListPrice(DataGridModel model);
        Task<PriceModel> CreatePrice(PriceModel priceModel);    
        Task<PriceModel> UpdatePrice(PriceModel priceModel);
        Task<bool> DeletePrice(Guid id);

        Task<BaseDataCollection<PriceModel>> GetFullPriceList();
    }

}