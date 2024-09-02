using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Helper;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Behaviours
{
    public class BookCarRespositoryService : IBookCarRespositoryService
    {
        private readonly TranportDBContext _context;
        private readonly IEmailRepositoryService _emailRepositoryService;
        public BookCarRespositoryService( TranportDBContext context, IEmailRepositoryService emailRepositoryService )
        {
            _context = context;
            _emailRepositoryService = emailRepositoryService;
        }

        public async Task<BookCarEntity> CreateBookCar(BookCarEntity entity)
        {
            if (entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            Mailrequest mailrequest = new Mailrequest();
            mailrequest.ToEmail = "phucphuc1912001@gmail.com";
            mailrequest.Subject = "chao nha";
            mailrequest.Body = "Cam on em";

            entity.CreateAt = DateTime.Now;
            entity.UpdateAt = DateTime.Now;
            _context.BookCarEntities.Add(entity);
            await _emailRepositoryService.SendEmailAsync(mailrequest);
            await _context.SaveChangesAsync();

            var result = await _context.BookCarEntities.FindAsync(entity.Id);
            return result ?? new();
        }

        public async Task<bool> DeleteBookCar(Guid id)
        {
            var entity = await _context.BookCarEntities.FindAsync(id);
            if (entity == null)
            {
                return false;
            }

            _context.BookCarEntities.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<BookCarFilterModel> GetBookCarFilter()
        {
            var bookCarStatus = await _context.BookCarEntities
               .Select(bc => bc.Status)
               .Distinct()
               .ToListAsync();

            var dataFilter = new BookCarFilterModel()
            {
               
                Status = bookCarStatus,
            };
            return dataFilter;
        }

        public async Task<BaseDataCollection<BookCarEntity>> GetListBooKCar(DataGridModel model)
        {
            var query = _context.BookCarEntities.AsQueryable();

            var condition = model.FilterInfo;
            if (condition.FilterCondition?.Any() == true)
            {
                foreach (var con in condition.FilterCondition)
                {
                   
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
                        //query = query.Where(x => x.StartTime != null && x.EndTime != null
                        //                                               && (x.StartTime.Value.Date >=
                        //                                                   start &&
                        //                                                   x.EndTime.Value.Date <= end));
                    }
                }
            }
            var search = model.SearchInfo.SearchRule;
            if (search.Any())
            {
                var searchItem = search.First().KeyWord;
                if (!string.IsNullOrEmpty(searchItem?.Trim()))
                {
                    query = query.Where(x => x.FullName != null && x.FullName.Contains(searchItem));
                }
            }

            var listBookCar = await query.OrderByDescending(x => x.CreateAt)
                                              .Skip(model.PageInfo.PageSize * (model.PageInfo.PageNo - 1))
                                              .Take(model.PageInfo.PageSize)
                                              .ToListAsync();

            var countTotal = await query.CountAsync();
            var result = new BaseDataCollection<BookCarEntity>();
            result.BaseDatas = listBookCar;
            result.TotalRecordCount = countTotal;
            result.PageCount =
               (int)Math.Ceiling(Convert.ToDecimal(countTotal) / Convert.ToDecimal(model.PageInfo.PageSize));
            result.PageIndex = model.PageInfo.PageNo;
            return result;
        }

       

        public Task<BookCarEntity> UpdateBookCar(BookCarEntity entity)
        {
            throw new NotImplementedException();
        }


        public async Task<List<BookCarOverviewModel>> BookCarOverView()
        {
            var listBookCar = _context.BookCarEntities.AsQueryable();

            // Get the current month and year
            var currentMonth = DateTime.Now.Month;
            var currentYear = DateTime.Now.Year;

            // Create a list to store the overview data
            var overviewData = new List<BookCarOverviewModel>();

            // Define the range of months you want to display (current month and 8 months before)
            for (int i = 0; i > -9; i--)
            {
                int month = currentMonth + i;
                int year = currentYear;

                // Adjust year if the month is outside the range of 1-12
                if (month < 1)
                {
                    month += 12;
                    year--;
                }

                // Calculate the number of BookCar entries for the current month and year
                var count = await listBookCar
                    .Where(b => b.StartTime.HasValue && b.StartTime.Value.Month == month && b.StartTime.Value.Year == year)
                    .CountAsync();

                // Add the result to the list with month and year formatted as "Month-Year"
                overviewData.Add(new BookCarOverviewModel
                {
                    Value = count,
                    Month = $"{month}-{year}"
                });
            }

            // Sort the data so that the most recent month is at the bottom
            overviewData = overviewData
                .OrderBy(o => DateTime.ParseExact(o.Month, "M-yyyy", null))
                .ToList();

            return overviewData;
        }

        public async Task<List<CustomerBookCarModel>> GetCustomer()
        {
            var listCustomer = await _context.BookCarEntities.OrderByDescending(x => x.CreateAt).Select(item => new CustomerBookCarModel()
            {
                CustomerName = item.FullName,
                Destination = item.Destination,
                PhoneNumber = item.PhoneNumber
            }).ToListAsync();

            return listCustomer; 
        }

    }
}
