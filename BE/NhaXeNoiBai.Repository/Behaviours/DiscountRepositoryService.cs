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
            if (entity.StartTime == null || entity.EndTime == null)
            {
                throw new ArgumentException("StartTime and EndTime cannot be null.");
            }

            // Check for overlapping discounts
            var overlappingDiscount = await _context.DiscountEntities
                .Where(d =>
                    (entity.StartTime < d.EndTime && entity.EndTime > d.StartTime))
                .FirstOrDefaultAsync();

            if (overlappingDiscount != null)
            {
                throw new InvalidOperationException("Đã có giảm giá trong khoảng thời gian chỉ định.");
            }

            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            entity.CreateAt = DateTime.Now;
            entity.UpdateAt = DateTime.Now;
            _context.DiscountEntities.Add(entity);
            await _context.SaveChangesAsync();

            var result = await _context.DiscountEntities.FindAsync(entity.Id);
            return result ?? new DiscountEntity();
        }


        public async Task<DiscountEntity> UpdateDiscount(DiscountEntity entity)
        {
            var existingEntity = await _context.DiscountEntities.FindAsync(entity.Id);
            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Discount entity not found");
            }

            existingEntity.Title = entity.Title;
            existingEntity.Description = entity.Description;
            existingEntity.StartTime = entity.StartTime;
            existingEntity.EndTime = entity.EndTime;
            existingEntity.UpdateAt = DateTime.Now;
            _context.DiscountEntities.Update(existingEntity);
            await _context.SaveChangesAsync();
            return existingEntity;
        }
    }
}
