using Microsoft.EntityFrameworkCore;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Enums;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Amazon.S3.Util.S3EventNotification;

namespace NhaXeNoiBai.Repository.Behaviours
{
    public class DiscountRepositoryService : IDiscountRepositoryService
    {
        private readonly TranportDBContext _context;

        public DiscountRepositoryService(TranportDBContext context)
        {
            _context = context;
        }
        public async Task<DiscountEntity> CreateDiscount(DiscountEntity entity)
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
            _context.DiscountEntities.Add(entity);
            await _context.SaveChangesAsync();

            var result = await _context.DiscountEntities.FindAsync(entity.Id);
            return result ?? new DiscountEntity();
        }


        public async Task<DiscountEntity> UpdateDiscount(DiscountEntity entity)
        {
            var existingEntity = await _context.DiscountEntities.FindAsync(entity.Id);
            var now = DateTime.Now;

            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Discount entity not found");
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
            existingEntity.DiscountNumber = entity.DiscountNumber;
            existingEntity.StartTime = entity.StartTime;
            existingEntity.Status = entity.Status;
            existingEntity.EndTime = entity.EndTime;
            existingEntity.UpdateAt = DateTime.Now;
            _context.DiscountEntities.Update(existingEntity);
            await _context.SaveChangesAsync();
            return existingEntity;
        }

        public async Task<bool> DeleteDiscount(Guid id)
        {
            var entity = await _context.DiscountEntities.FindAsync(id);
            if (entity == null)
            {
                return false;
            }

            _context.DiscountEntities.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<BaseDataCollection<DiscountEntity>> GetListDiscount(DataGridModel model)
        {
            var query = _context.DiscountEntities.AsQueryable();

            var condition = model.FilterInfo;
            if (condition.FilterCondition?.Any() == true)
            {
                foreach (var con in condition.FilterCondition)
                {
                    if (con.ColumnName == "Money" && con.Values?.Any() == true)
                    {
                        query = query.Where(x => con.Values.Select(a => a.ToString()).Contains(x.DiscountNumber));
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

            var listDiscount = await query.OrderByDescending(x => x.CreateAt).ToListAsync();
            var countTotal = await query.CountAsync();

            var result = new BaseDataCollection<DiscountEntity>();
            result.BaseDatas = listDiscount;
            result.TotalRecordCount = countTotal;
            result.PageCount =
               (int)Math.Ceiling(Convert.ToDecimal(countTotal) / Convert.ToDecimal(model.PageInfo.PageSize));
            result.PageIndex = model.PageInfo.PageNo;
            return result;
        }
    }
}
