using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Interfaces
{
    public interface IMoneyRepositoryService
    {
        Task<BaseDataCollection<MoneyEntity>> GetListMoney (DataGridModel model);
        Task<MoneyEntity> CreateMoney(MoneyEntity entity);
        Task<MoneyEntity> UpdateMoney(MoneyEntity entity);
        Task<bool> DeleteMoney(Guid id);
        Task<BaseDataCollection<MoneyEntity>> GetFullListMoney();
    }
}
