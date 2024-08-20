using AutoMapper;
using Microsoft.Extensions.Logging;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Repository.Interfaces;
using NhaXeNoiBai.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Service.Behaviours
{
    public class PriceService : IPriceService
    {
        private readonly ILogger<PriceService> _logger;
        private readonly IPriceRepositoryService _priceRepositoryService;
        private readonly IMapper _mapper;
        public PriceService(ILogger<PriceService> logger, IPriceRepositoryService priceRepositoryService, IMapper mapper)
        {
            this._logger = logger;
            this._priceRepositoryService = priceRepositoryService;
            this._mapper = mapper;
        }

        public async Task<BaseDataCollection<PriceModel>> GetListPrice(DataGridModel model)
        {
            _logger.LogDebug("Entered method GetListPrice");

            var result = await _priceRepositoryService.GetListPrice(model);
            var baseResult = new BaseDataCollection<PriceModel>
            {
                TotalRecordCount = result.TotalRecordCount,
                PageCount = result.PageCount,
                PageIndex = result.PageIndex,
                BaseDatas = _mapper.Map<List<PriceModel>>(result.BaseDatas)
            };

            _logger.LogDebug("Leaving method GetListPrice");
            return baseResult;
        }

        public async Task<PriceModel> CreatePrice(PriceModel priceModel)
        {
            var priceEntity = _mapper.Map<PriceEntity>(priceModel);
            var entity = await _priceRepositoryService.CreatePrice(priceEntity);
            var result = _mapper.Map<PriceModel>(entity);
            return result;
        }

        public async Task<PriceModel> UpdatePrice(PriceModel priceModel)
        {
            var priceEntity = _mapper.Map<PriceEntity>(priceModel);
            var entity = await _priceRepositoryService.UpdatePrice(priceEntity);
            var result = _mapper.Map<PriceModel>(entity);
            return result;

        }

        public async Task<bool> DeletePrice(Guid id)
        {
            var result = await _priceRepositoryService.DeletePrice(id);
            return result;
        }

        public async Task<BaseDataCollection<PriceModel>> GetFullPriceList()
        {
            _logger.LogDebug("Entered method GetFullPriceList");

            var result = await _priceRepositoryService.GetFullPriceList();
            var baseResult = new BaseDataCollection<PriceModel>
            {
                BaseDatas = _mapper.Map<List<PriceModel>>(result.BaseDatas)
            };

            _logger.LogDebug("Leaving method GetFullPriceList");
            return baseResult;
        }
    }
}
