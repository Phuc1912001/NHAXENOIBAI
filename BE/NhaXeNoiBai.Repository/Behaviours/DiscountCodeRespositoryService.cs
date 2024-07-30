using Microsoft.EntityFrameworkCore;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Enums;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Behaviours
{
    public class DiscountCodeRespositoryService : IDiscountCodeRepositoryService
    {
        private readonly TranportDBContext _context;
        public DiscountCodeRespositoryService(TranportDBContext context)
        {
            _context = context;
        }

        public async Task<BaseDataCollection<DiscountCodeEntity>> GetListDiscountCode(DataGridModel model)
        {
            var query = _context.DiscountCodeEntities.AsQueryable();

            var condition = model.FilterInfo;
            if (condition.FilterCondition?.Any() == true)
            {
                foreach (var con in condition.FilterCondition)
                {
                    if (con.ColumnName == "Money" && con.Values?.Any() == true)
                    {
                        query = query.Where(x => con.Values.Select(a => a.ToString()).Contains(x.DiscountCodeNumber));
                    }
                    if (con.ColumnName == "Status" && con.Values?.Any() == true)
                    {
                        query = query.Where(x => con.Values.Select(a => a).Contains(x.Status));
                    }
                    if (con.ColumnName == "Date Range" && con.Values?.Any() == true)
                    {
                        DateTime.TryParse(con.Values[0].ToString(), out DateTime startDate);
                        DateTime.TryParse(con.Values[1].ToString(), out DateTime endDate);
                        var start = startDate;
                        var end = endDate;
                        query = query.Where(x => x.StartTime != null && x.EndTime != null
                                                                       && (x.StartTime.Value.Date >=
                                                                           start &&
                                                                           x.EndTime.Value.Date <= end));
                    }
                }
            }
            var search = model.SearchInfo.SearchRule;
            if (search.Any())
            {
                var searchItem = search.First().KeyWord;
                if (!string.IsNullOrEmpty(searchItem?.Trim()))
                {
                    query = query.Where(x => x.Title != null && x.Title.Contains(searchItem));
                }
            }

            var listDiscountCode = await query.OrderByDescending(x=> x.CreateAt).ToListAsync();
            var countTotal = await query.CountAsync();

            var result = new BaseDataCollection<DiscountCodeEntity>();
            result.BaseDatas = listDiscountCode;
            result.TotalRecordCount = countTotal;
            result.PageCount =
               (int)Math.Ceiling(Convert.ToDecimal(countTotal) / Convert.ToDecimal(model.PageInfo.PageSize));
            result.PageIndex = model.PageInfo.PageNo;
            return result;
        }

        public async Task<DiscountCodeEntity> CreateDiscountCode(DiscountCodeEntity entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            var now = DateTime.Now;
            entity.CreateAt = now;
            if (entity.StartTime <= now && now <= entity.EndTime)
            {
                entity.Status = (int)DiscountCodeStatusEnum.Active;
            }
            else if (entity.StartTime > now)
            {
                entity.Status = (int)DiscountCodeStatusEnum.PendingActive;
            }
            else if (entity.EndTime < now)
            {
                entity.Status = (int)DiscountCodeStatusEnum.Expired;
            }
            _context.DiscountCodeEntities.Add(entity);
            await _context.SaveChangesAsync();

            var result = await _context.DiscountCodeEntities.FindAsync(entity.Id);
            return result ?? new DiscountCodeEntity();
        }

        public async Task<DiscountCodeEntity> UpdateDiscountCode(DiscountCodeEntity entity)
        {
            var existingEntity = await _context.DiscountCodeEntities.FindAsync(entity.Id);
            var now = DateTime.Now;

            if (existingEntity == null)
            {
                throw new KeyNotFoundException("DiscountCode entity not found");
            }

            if (entity.StartTime <= now && now <= entity.EndTime)
            {
                entity.Status = (int)DiscountCodeStatusEnum.Active;
            }
            else if (entity.StartTime > now)
            {
                entity.Status = (int)DiscountCodeStatusEnum.PendingActive;
            }
            else if (entity.EndTime < now)
            {
                entity.Status = (int)DiscountCodeStatusEnum.Expired;
            }

            existingEntity.Title = entity.Title;
            existingEntity.Description = entity.Description;
            existingEntity.DiscountCodeNumber = entity.DiscountCodeNumber;
            existingEntity.StartTime = entity.StartTime;
            existingEntity.Status = entity.Status;
            existingEntity.EndTime = entity.EndTime;
            existingEntity.UpdateAt = DateTime.Now;
            _context.DiscountCodeEntities.Update(existingEntity);
            await _context.SaveChangesAsync();
            return existingEntity;
        }
        public async Task<bool> DeleteDiscountCode(Guid id)
        {
            var entity = await _context.DiscountCodeEntities.FindAsync(id);
            if (entity == null)
            {
                return false;
            }

            _context.DiscountCodeEntities.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<DiscountCodeEntity>> GetExpiredDiscountCodesAsync()
        {

            var query = await _context.DiscountCodeEntities
            .Where(dc => dc.EndTime.HasValue && dc.EndTime.Value < DateTime.Now && dc.Status != (int)DiscountCodeStatusEnum.Expired)
            .ToListAsync();
            return query;
        }
        public async Task<List<DiscountCodeEntity>> GetActiveDiscountCodesAsync()
        {
            var now = DateTime.Now;

            var q1 = await _context.DiscountCodeEntities.ToListAsync();
            var query = await _context.DiscountCodeEntities
                 .Where(dc => dc.StartTime.HasValue
                              && dc.StartTime.Value < now
                              && dc.EndTime.HasValue
                              && dc.EndTime.Value > now
                              && dc.Status != (int)DiscountCodeStatusEnum.Active)
                 .ToListAsync();
            return query;
        }
        public async Task UpdateDiscountCodeAsync(DiscountCodeEntity discountCode)
        {
            _context.DiscountCodeEntities.Update(discountCode);
            await _context.SaveChangesAsync();
        }

        public async Task<DiscountCodeFilterModel> GetListFilterDiscountCode()
        {
            var moneyFilter = await _context.DiscountCodeEntities
                             .Join(
                                 _context.MoneyEntities,
                                 dc => dc.DiscountCodeNumber,
                                 m => m.Id.ToString(),
                                 (dc, m) => new MoneyFilterOptionModel
                                 {
                                     Value = m.Id,
                                     Label = m.Title,
                                     Money = m.Money
                                 })
                             .Distinct()
                             .OrderBy( x => x.Money)
                             .ToListAsync();

            var discountCodeStatus = await _context.DiscountCodeEntities
                .Select(dc => dc.Status)
                .Distinct()
                .ToListAsync();

            var dataFilter = new DiscountCodeFilterModel()
            {
                MoneyFilters = moneyFilter,
                Status = discountCodeStatus
            };
            return dataFilter;
        }

    }
}
