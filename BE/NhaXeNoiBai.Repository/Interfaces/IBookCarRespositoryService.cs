using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Repository.Interfaces
{
    public interface IBookCarRespositoryService
    {
        Task<BaseDataCollection<BookCarEntity>> GetListBooKCar(DataGridModel model);
        Task<BookCarEntity> CreateBookCar(BookCarEntity entity);
        Task<BookCarEntity> UpdateBookCar(BookCarEntity entity);

        Task<bool> DeleteBookCar(Guid id);

        Task<BookCarFilterModel> GetBookCarFilter();
        Task<List<CustomerBookCarModel>> GetCustomer();
        Task<List<BookCarOverviewModel>> BookCarOverView();

    }
}
