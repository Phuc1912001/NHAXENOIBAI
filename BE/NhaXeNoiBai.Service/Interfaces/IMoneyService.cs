using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Interfaces
{
    public interface IMoneyService
    {
        Task<BaseDataCollection<MoneyModel>> GetListMoney(DataGridModel model);
        Task<MoneyModel> CreateMoney(MoneyModel moneyModel);
        Task<MoneyModel> UpdateMoney(MoneyModel moneyModel);
        Task<bool> DeleteMoney(Guid id);

        Task<BaseDataCollection<MoneyModel>> GetFullListMoney();

    }
}
