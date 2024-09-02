using Microsoft.EntityFrameworkCore;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Enums;
using NhaXeNoiBai.Model.Exceptions;
using NhaXeNoiBai.Model.Migrations;
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

            // Check for overlapping discount periods
            bool isOverlapping = await _context.DiscountEntities
                .AnyAsync(d => (d.StartTime < entity.EndTime && d.EndTime > entity.StartTime));

            if (isOverlapping)
            {
                throw new DiscountException("Đã có chương trình khuyến mãi trong thời gian này");

            }

            // Set status based on the current time
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

            // Check for overlapping discount periods
            bool isOverlapping = await _context.DiscountEntities
                .AnyAsync(d => (d.StartTime < entity.EndTime && d.EndTime > entity.StartTime) && d.Id != entity.Id);

            if (isOverlapping)
            {
                throw new DiscountException("Đã có chương trình khuyến mãi trong thời gian này");
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

            var listDiscount = await query.OrderByDescending(x => x.StartTime)
                                          .Skip(model.PageInfo.PageSize * (model.PageInfo.PageNo - 1))
                                          .Take(model.PageInfo.PageSize)
                                          .ToListAsync();
            var countTotal = await query.CountAsync();

            var result = new BaseDataCollection<DiscountEntity>();
            result.BaseDatas = listDiscount;
            result.TotalRecordCount = countTotal;
            result.PageCount =
               (int)Math.Ceiling(Convert.ToDecimal(countTotal) / Convert.ToDecimal(model.PageInfo.PageSize));
            result.PageIndex = model.PageInfo.PageNo;
            return result;
        }

        public async Task<DiscountCodeFilterModel> GetListFilterDiscount()
        {
            var moneyFilter = await _context.DiscountEntities
                             .Join(
                                 _context.MoneyEntities,
                                 dc => dc.DiscountNumber,
                                 m => m.Id.ToString(),
                                 (dc, m) => new MoneyFilterOptionModel
                                 {
                                     Value = m.Id,
                                     Label = m.Title,
                                     Money = m.Money
                                 })
                             .Distinct()
                             .OrderBy(x => x.Money)
                             .ToListAsync();

            var discountCodeStatus = await _context.DiscountEntities
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

        public async Task<List<DiscountEntity>> GetExpiredDiscountAsync()
        {
            var query = await _context.DiscountEntities
             .Where(dc => dc.EndTime.HasValue && dc.EndTime.Value < DateTime.Now && dc.Status != (int)DiscountCodeStatusEnum.Expired)
             .ToListAsync();
            return query; ;
        }

        public async Task<List<DiscountEntity>> GetActiveDiscountAsync()
        {
            var now = DateTime.Now;
            var query = await _context.DiscountEntities
                 .Where(dc => dc.StartTime.HasValue
                              && dc.StartTime.Value < now
                              && dc.EndTime.HasValue
                              && dc.EndTime.Value > now
                              && dc.Status != (int)DiscountCodeStatusEnum.Active)
                 .ToListAsync();
            return query;
        }

        public async Task UpdateDiscountAsync(DiscountEntity discount)
        {
            _context.DiscountEntities.Update(discount);
            await _context.SaveChangesAsync();
        }

        public async Task<DiscountModel> GetDiscountNotice()
        {
            var query = await _context.DiscountEntities.Where(d => d.Status == (int)DiscountCodeStatusEnum.Active).FirstOrDefaultAsync();
            var result = new DiscountNoticeModel()
            {
                Title = query?.Title,
                Status = query?.Status,
                StartTime = query?.StartTime,
                EndTime = query?.EndTime,
            };
            return result;
        }

        public async Task<DiscountChartModel> GetDiscountChart()
        {
            var query = _context.DiscountEntities.AsQueryable();

            // Fetch statuses and counts from the database
            var groupedData = await query.GroupBy(dc => dc.Status)
                                         .Select(g => new
                                         {
                                             Status = g.Key,
                                             Count = g.Count()
                                         }).ToListAsync();

            // Transform data in-memory using RenderStatus
            var legenData = groupedData.Select(g => RenderStatus(g.Status)).Distinct().ToList();
            var seriesData = groupedData.Select(g => new SeriesData
            {
                Value = g.Count,
                Name = RenderStatus(g.Status)
            }).ToList();

            var discountChartModel = new DiscountChartModel
            {
                LegenData = legenData,
                SeriesDatas = seriesData
            };

            return discountChartModel;
        }

        public string RenderStatus(int? status)
        {
            switch (status)
            {
                case (int)DiscountCodeStatusEnum.Active:
                    return "Hoạt động";
                case (int)DiscountCodeStatusEnum.Expired:
                    return "Hết hạn";
                case (int)DiscountCodeStatusEnum.PendingActive:
                    return "Chờ hoạt động";
                default:
                    return "Trạng thái không xác định";
            }
        }

        public async Task<List<DiscountCodeViewModel>> GetDiscountOverViewModel()
        {
            var discountEntities = await _context.DiscountEntities.ToListAsync();

            var discountOverview = discountEntities
                                        .GroupBy(item => item.Status)
                                        .Select(group => new DiscountCodeViewModel
                                        {
                                            Value = group.Count(),
                                            Status = RenderStatus(group.Key)
                                        })
                                        .ToList();

            return discountOverview;
        }
    }
}
