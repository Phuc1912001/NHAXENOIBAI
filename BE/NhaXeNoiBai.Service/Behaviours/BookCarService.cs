using AutoMapper;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Migrations;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Behaviours;
using NhaXeNoiBai.Repository.Interfaces;
using NhaXeNoiBai.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Behaviours
{
    public class BookCarService : IBookCarService
    {
        private readonly IBookCarRespositoryService _bookCarRespositoryService;
        private readonly IMapper _mapper;

        public BookCarService(IBookCarRespositoryService bookCarRespositoryService, IMapper mapper)
        {
            _bookCarRespositoryService = bookCarRespositoryService;
            _mapper = mapper;
        }

        public async Task<List<BookCarOverviewModel>> BookCarOverView()
        {
            var result = await _bookCarRespositoryService.BookCarOverView();
            return result;
        }

        public async Task<BookCarModel> CreateBookCar(BookCarModel bookCar)
        {
            var bookCarEntity = _mapper.Map<BookCarEntity>(bookCar);
            var entity = await _bookCarRespositoryService.CreateBookCar(bookCarEntity);
            var result = _mapper.Map<BookCarModel>(entity);

            return result;
        }

        public async Task<bool> DeleteBookCar(Guid id)
        {
            var result = await _bookCarRespositoryService.DeleteBookCar(id);
            return result;
        }

        public async Task<BookCarFilterModel> GetBookCarFilter()
        {
            var result = await _bookCarRespositoryService.GetBookCarFilter();
            return result;
        }

        public async Task<List<CustomerBookCarModel>> GetCustomer()
        {
            var result = await _bookCarRespositoryService.GetCustomer();
            return result;
        }

        public async Task<BaseDataCollection<BookCarModel>> GetListBooKCar(DataGridModel model)
        {
           
            var listBookCar = await _bookCarRespositoryService.GetListBooKCar(model);

            var resultList = listBookCar.BaseDatas?.Select(bc => new BookCarModel
            {
                Id = bc.Id,
                FullName = bc.FullName,
                PhoneNumber = bc.PhoneNumber,
                Cartype = bc.Cartype,
                StartTime = bc.StartTime,
                Origin = bc.Origin,
                Destination = bc.Destination,
                Duration = bc.Duration,
                Distantce = bc.Distantce,
                TotalNumber = bc.TotalNumber,
                Status = bc.Status,
                
            }).ToList() ?? new List<BookCarModel>(); 

            // Create and return the BaseDataCollection
            var baseResult = new BaseDataCollection<BookCarModel>
            {
                TotalRecordCount = listBookCar.TotalRecordCount,
                PageCount = listBookCar.PageCount,
                PageIndex = listBookCar.PageIndex,
                BaseDatas = resultList
            };

            return baseResult;
        }


        public Task<BookCarModel> UpdateBookCar(BookCarEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
