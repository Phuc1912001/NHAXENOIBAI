using AutoMapper;
using Microsoft.Extensions.Logging;
using NhaXeNoiBai.Model.Entities;
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
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepositoryService _discountRepositoryService;
        private readonly IMoneyService _moneyService;
        private readonly IMapper _mapper;
        private readonly ILogger<DiscountCodeService> _logger;

        public DiscountService(IDiscountRepositoryService discountRepositoryService, IMapper mapper, IMoneyService moneyService, ILogger<DiscountCodeService> logger)
        {
            this._discountRepositoryService = discountRepositoryService;
            this._mapper = mapper;
            _moneyService = moneyService;
            _logger = logger;
        }
        public async Task<DiscountModel> CreateDiscount(DiscountModel discountModel)
        {
            var discountEntity = _mapper.Map<DiscountEntity>(discountModel);
            var entity = await _discountRepositoryService.CreateDiscount(discountEntity);
            var result = _mapper.Map<DiscountModel>(entity);
            return result;
        }

        public Task<bool> DeleteDiscount(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<BaseDataCollection<DiscountModel>> GetListDiscount(DataGridModel model)
        {
            var listMoney = await _moneyService.GetFullListMoney();
            var listDiscount = await _discountRepositoryService.GetListDiscount(model);
            var resultList = listDiscount.BaseDatas.Select(dc =>
            new DiscountModel
            {
                Id = dc.Id,
                Title = dc.Title,
                StartTime = dc.StartTime,
                EndTime = dc.EndTime,
                Description = dc.Description,
                Status = dc.Status,
                DiscountNumber = dc.DiscountNumber,
                DiscountCodeTitle = listMoney.BaseDatas
                    .Where(m => m.Id.ToString() == dc.DiscountNumber)
                    .Select(x => x.Title)
                    .FirstOrDefault()

            }).ToList();
            var baseResult = new BaseDataCollection<DiscountModel>
            {
                TotalRecordCount = listDiscount.TotalRecordCount,
                PageCount = listDiscount.PageCount,
                PageIndex = listDiscount.PageIndex,
                BaseDatas = resultList
            };
            _logger.LogDebug("Leaving method GetListDiscount");
            return baseResult;
        }

        public Task<DiscountModel> UpdateDiscount(DiscountModel discountModel)
        {
            throw new NotImplementedException();
        }
    }
}
