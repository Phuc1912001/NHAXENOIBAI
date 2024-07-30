using AutoMapper;
using Microsoft.Extensions.Logging;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Enums;
using NhaXeNoiBai.Model.Migrations;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Behaviours;
using NhaXeNoiBai.Repository.Interfaces;
using NhaXeNoiBai.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Behaviours
{
    public class DiscountCodeService : IDiscountCodeService
    {
        private readonly IDiscountCodeRepositoryService _discountCodeRepositoryService;
        private readonly IMoneyService _moneyService;
        private readonly ILogger<DiscountCodeService> _logger;
        private readonly IMapper _mapper;
        public DiscountCodeService(IDiscountCodeRepositoryService discountCodeRepositoryService, ILogger<DiscountCodeService> logger, IMapper mapper, IMoneyService moneyService )
        {
            _discountCodeRepositoryService = discountCodeRepositoryService;
            _moneyService = moneyService;
            _logger = logger;
            _mapper = mapper;
        }
        public async Task<DiscountCodeModel> CreateDiscountCode(DiscountCodeModel discountCode)
        {
            var discountCodeEntity = _mapper.Map<DiscountCodeEntity>(discountCode);
            var entity = await _discountCodeRepositoryService.CreateDiscountCode(discountCodeEntity);
            var result = _mapper.Map<DiscountCodeModel>(entity);

            return result;
        }

        public async Task<BaseDataCollection<DiscountCodeModel>> GetListDiscountCode(DataGridModel model)
        {
            var listMoney = await _moneyService.GetFullListMoney();
            var listDiscountCode = await _discountCodeRepositoryService.GetListDiscountCode(model);
            var resultList = listDiscountCode.BaseDatas.Select(dc =>
            new DiscountCodeModel
            {
                Id = dc.Id,
                Title = dc.Title,
                StartTime = dc.StartTime,
                EndTime = dc.EndTime,
                Description = dc.Description,
                Status = dc.Status,
                DiscountCodeNumber = dc.DiscountCodeNumber,
                DiscountCodeTitle = listMoney.BaseDatas
                    .Where(m => m.Id.ToString() == dc.DiscountCodeNumber)
                    .Select(x => x.Title)
                    .FirstOrDefault() 
                   
            }).ToList(); 
            var baseResult = new BaseDataCollection<DiscountCodeModel>
            {
                TotalRecordCount = listDiscountCode.TotalRecordCount,
                PageCount = listDiscountCode.PageCount,
                PageIndex = listDiscountCode.PageIndex,
                BaseDatas = resultList
            };
            _logger.LogDebug("Leaving method GetListDiscountCode");
            return baseResult;
        }
        public async Task<DiscountCodeModel> UpdateDiscountCode(DiscountCodeModel discountCode)
        {
            var discountCodeEntity = _mapper.Map<DiscountCodeEntity>(discountCode);
            var entity = await _discountCodeRepositoryService.UpdateDiscountCode(discountCodeEntity);
            var result = _mapper.Map<DiscountCodeModel>(entity);
            return result;
        }
        public async Task<bool> DeleteDiscountCode(Guid id)
        {
            var result = await _discountCodeRepositoryService.DeleteDiscountCode(id);
            return result;
        }
        public async Task UpdateExpiredDiscountCodesAsync()
        {
            var expiredCodes = await _discountCodeRepositoryService.GetExpiredDiscountCodesAsync();
            foreach (var code in expiredCodes)
            {
                code.Status = (int)DiscountCodeStatusEnum.Expired;
                await _discountCodeRepositoryService.UpdateDiscountCodeAsync(code);
            }

            var activeCodes = await _discountCodeRepositoryService.GetActiveDiscountCodesAsync();
            foreach (var code in activeCodes)
            {
                code.Status = (int)DiscountCodeStatusEnum.Active;
                await _discountCodeRepositoryService.UpdateDiscountCodeAsync(code);
            }
        }

        public async Task<DiscountCodeFilterModel> GetListFilterDiscountCode()
        {
            var result = await _discountCodeRepositoryService.GetListFilterDiscountCode();
            return result;
        }
    }
}
