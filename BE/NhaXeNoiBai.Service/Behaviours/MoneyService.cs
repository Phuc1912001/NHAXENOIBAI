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

    public class MoneyService : IMoneyService
    {
        private readonly ILogger<MoneyService> _logger;
        private readonly IMoneyRepositoryService _moneyRepositoryService;
        private readonly IMapper _mapper;
        public MoneyService(ILogger<MoneyService> logger, IMoneyRepositoryService moneyRepositoryService, IMapper mapper)
        {
            _logger = logger;
            _moneyRepositoryService = moneyRepositoryService;
            _mapper = mapper;
        }
        public async Task<BaseDataCollection<MoneyModel>> GetListMoney(DataGridModel model)
        {
            _logger.LogDebug("Entered method GetListMoney");

            var result = await _moneyRepositoryService.GetListMoney(model);
            var baseResult = new BaseDataCollection<MoneyModel>
            {
                TotalRecordCount = result.TotalRecordCount,
                PageCount = result.PageCount,
                PageIndex = result.PageIndex,
                BaseDatas = _mapper.Map<List<MoneyModel>>(result.BaseDatas)
            };

            _logger.LogDebug("Leaving method GetListMoney");
            return baseResult;
        }
        public async Task<MoneyModel> CreateMoney(MoneyModel MoneyModel)
        {
            var moneyEntity = _mapper.Map<MoneyEntity>(MoneyModel);
            var entity = await _moneyRepositoryService.CreateMoney(moneyEntity);
            var result = _mapper.Map<MoneyModel>(entity);
            return result;
        }

        public async Task<MoneyModel> UpdateMoney(MoneyModel moneyModel)
        {
            var moneyEntity = _mapper.Map<MoneyEntity>(moneyModel);
            var entity = await _moneyRepositoryService.UpdateMoney(moneyEntity);
            var result = _mapper.Map<MoneyModel>(entity);
            return result;
        }

        public async Task<bool> DeleteMoney(Guid id)
        {
            var result = await _moneyRepositoryService.DeleteMoney(id);
            return result;
        }

        public async Task<BaseDataCollection<MoneyModel>> GetFullListMoney()
        {
            _logger.LogDebug("Entered method GetListMoney");
            var result = await _moneyRepositoryService.GetFullListMoney();
            var baseResult = new BaseDataCollection<MoneyModel>
            {
                BaseDatas = _mapper.Map<List<MoneyModel>>(result.BaseDatas)
            };
            _logger.LogDebug("Leaving method GetListMoney");
            return baseResult;
        }
    }
}
