using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Interfaces
{
    public interface IBookCarService
    {
        Task<BaseDataCollection<BookCarModel>> GetListBooKCar(DataGridModel model);
        Task<BookCarModel> CreateBookCar(BookCarModel entity);
        Task<BookCarModel> UpdateBookCar(BookCarEntity entity);
        Task<bool> DeleteBookCar(Guid id);
        Task<BookCarFilterModel> GetBookCarFilter();
        Task<List<CustomerBookCarModel>> GetCustomer();

        Task<List<BookCarOverviewModel>> BookCarOverView();
    }
}
