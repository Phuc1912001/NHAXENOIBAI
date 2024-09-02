using Microsoft.EntityFrameworkCore;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Behaviours
{
    public partial class PriceRepositoryService : IPriceRepositoryService
    {
        private readonly TranportDBContext _context;

        public PriceRepositoryService(TranportDBContext context)
        {
            _context = context;
        }
        public async Task<BaseDataCollection<PriceEntity>> GetListPrice(DataGridModel model)
        {
            var query =  _context.PriceEntities.AsQueryable();

            var search = model.SearchInfo.SearchRule;
            if (search.Any())
            {
                var searchItem = search.First().KeyWord;
                if (!string.IsNullOrEmpty(searchItem?.Trim()))
                {
                    query = query.Where(x => x.CarType != null && x.CarType.Contains(searchItem));
                }
            }
            var listPrice = await query.OrderBy(x => x.FromHanoiToNoiBai)
                                          .Skip(model.PageInfo.PageSize * (model.PageInfo.PageNo - 1))
                                          .Take(model.PageInfo.PageSize)
                                          .ToListAsync();

            var countTotal = await query.CountAsync();

            var result = new BaseDataCollection<PriceEntity>();
            result.BaseDatas = listPrice;
            result.TotalRecordCount = countTotal;
            result.PageCount =
               (int)Math.Ceiling(Convert.ToDecimal(countTotal) / Convert.ToDecimal(model.PageInfo.PageSize));
            result.PageIndex = model.PageInfo.PageNo;
            return result;
        }

        public async Task<PriceEntity> CreatePrice(PriceEntity entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            entity.CreateAt = DateTime.Now;
            entity.UpdateAt = DateTime.Now;
            _context.PriceEntities.Add(entity);
             await _context.SaveChangesAsync();
            
            var result = await _context.PriceEntities.FindAsync(entity.Id);
            return result ?? new();
        }

        public async Task<PriceEntity> UpdatePrice(PriceEntity price)
        {
            var existingEntity = await _context.PriceEntities.FindAsync(price.Id);
            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Price entity not found");
            }

            existingEntity.CarType = price.CarType;
            existingEntity.FromHanoiToNoiBai = price.FromHanoiToNoiBai;
            existingEntity.FromNoiBaiToHanoi = price.FromNoiBaiToHanoi;
            existingEntity.CarType = price.CarType;
            existingEntity.MoneyKm = price.MoneyKm;
            existingEntity.ToWay = price.ToWay;
            existingEntity.UpdateAt = DateTime.Now;
            _context.PriceEntities.Update(existingEntity);  
            await _context.SaveChangesAsync();
            return existingEntity;
        }

        public async Task<bool> DeletePrice(Guid id)
        {
            var entity = await _context.PriceEntities.FindAsync(id);
            if (entity == null)
            {
                return false;
            }

            _context.PriceEntities.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<BaseDataCollection<PriceEntity>> GetFullPriceList()
        {
            var listPrice = await _context.PriceEntities.OrderBy(x => x.FromHanoiToNoiBai).ToListAsync();   
            var result = new BaseDataCollection<PriceEntity>();
            result.BaseDatas = listPrice;
            return result;
        }
    }
}
