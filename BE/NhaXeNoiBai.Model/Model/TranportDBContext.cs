using Microsoft.EntityFrameworkCore;
using NhaXeNoiBai.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class TranportDBContext : DbContext
    {
        public TranportDBContext(DbContextOptions<TranportDBContext> options) : base(options)
        {

        }
        public DbSet<PriceEntity> PriceEntities { get; set; }
        public DbSet<DocumentEntity> DocumentEntities { get; set; }
        public DbSet<DiscountEntity> DiscountEntities { get; set; }
        public DbSet<DiscountCodeEntity> DiscountCodeEntities { get; set; }
        public DbSet<MoneyEntity> MoneyEntities { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

    }
}
