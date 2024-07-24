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
            var listPrice = await _context.PriceEntities.ToListAsync();
            var countTotal = await _context.PriceEntities.CountAsync();

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

        public Task<PriceEntity> UpdatePrice(PriceEntity priceEntity)
        {
            throw new NotImplementedException();
        }

        
    }
}
