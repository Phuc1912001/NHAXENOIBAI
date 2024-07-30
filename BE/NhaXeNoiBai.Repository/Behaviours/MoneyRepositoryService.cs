using Microsoft.EntityFrameworkCore;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace NhaXeNoiBai.Repository.Behaviours
{
    public class MoneyRepositoryService : IMoneyRepositoryService
    {
        private readonly TranportDBContext _context;

        public MoneyRepositoryService(TranportDBContext context)
        {
            _context = context;
        }
        public async Task<MoneyEntity> CreateMoney(MoneyEntity entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            entity.CreateAt = DateTime.Now;
            entity.UpdateAt = DateTime.Now;
            _context.MoneyEntities.Add(entity);
            await _context.SaveChangesAsync();

            var result = await _context.MoneyEntities.FindAsync(entity.Id);
            return result ?? new();
        }

        public async Task<MoneyEntity> UpdateMoney(MoneyEntity entity)
        {
            var existingEntity = await _context.MoneyEntities.FindAsync(entity.Id);
            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Money entity not found");
            }

            existingEntity.Title = entity.Title;
            existingEntity.Money = entity.Money;
            existingEntity.UpdateAt = DateTime.Now;
            _context.MoneyEntities.Update(existingEntity);
            await _context.SaveChangesAsync();
            return existingEntity;
        }
        public async Task<bool> DeleteMoney(Guid id)
        {
            var entity = await _context.MoneyEntities.FindAsync(id);
            if (entity == null)
            {
                return false;
            }

            _context.MoneyEntities.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<BaseDataCollection<MoneyEntity>> GetListMoney(DataGridModel model)
        {
            var query = _context.MoneyEntities.AsQueryable();

            var search = model.SearchInfo.SearchRule;
            if (search.Any())
            {
                var searchItem = search.First().KeyWord;
                if (!string.IsNullOrEmpty(searchItem?.Trim()))
                {
                    query = query.Where(x => x.Title != null && x.Title.Contains(searchItem));
                }
            }
            var listMoney = await query.OrderBy(x => x.Money).ToListAsync();
            var countTotal = await query.CountAsync();
            var result = new BaseDataCollection<MoneyEntity>();
            result.BaseDatas = listMoney;
            result.TotalRecordCount = countTotal;
            result.PageCount =
               (int)Math.Ceiling(Convert.ToDecimal(countTotal) / Convert.ToDecimal(model.PageInfo.PageSize));
            result.PageIndex = model.PageInfo.PageNo;
            return result;
        }

        public async Task<BaseDataCollection<MoneyEntity>> GetFullListMoney()
        {
            var listMoney = await _context.MoneyEntities.OrderBy(x => x.Money).ToListAsync();
            var result = new BaseDataCollection<MoneyEntity>();
            result.BaseDatas = listMoney;
            return result;
        }
    }
}
