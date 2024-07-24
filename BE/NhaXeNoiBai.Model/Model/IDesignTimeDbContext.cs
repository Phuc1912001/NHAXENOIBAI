using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace NhaXeNoiBai.Model.Model
{
    public class IDesignTimeDbContext : IDesignTimeDbContextFactory<TranportDBContext>
    {
        public TranportDBContext CreateDbContext(string[] args)
        {

            var builder = new DbContextOptionsBuilder<TranportDBContext>();
            var connectionString = "Data Source=AVEHN253L;Initial Catalog=TransportDataBase;Integrated Security=False;User Id=sa;Password=PhucPhuc123@;TrustServerCertificate=True;MultipleActiveResultSets=True";

            builder.UseSqlServer(connectionString);

            return new TranportDBContext(builder.Options);
        }
    }
}
