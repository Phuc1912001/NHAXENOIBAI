using AutoMapper;
using Microsoft.Extensions.Logging;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Enums;
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
        private readonly IDoccumentRepositoryService _doccumentRepositoryService;
        private readonly IMoneyService _moneyService;
        private readonly IMapper _mapper;
        private readonly ILogger<DiscountCodeService> _logger;

        public DiscountService(IDiscountRepositoryService discountRepositoryService, IMapper mapper, IMoneyService moneyService, ILogger<DiscountCodeService> logger, IDoccumentRepositoryService doccumentRepositoryService)
        {
            this._discountRepositoryService = discountRepositoryService;
            this._doccumentRepositoryService = doccumentRepositoryService;
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

        public async Task<bool> DeleteDiscount(Guid id)
        {
            var result = await _discountRepositoryService.DeleteDiscount(id);
            return result;
        }

        public async Task<DiscountModel> UpdateDiscount(DiscountModel discountModel)
        {
            var discountEntity = _mapper.Map<DiscountEntity>(discountModel);
            var entity = await _discountRepositoryService.UpdateDiscount(discountEntity);
            var result = _mapper.Map<DiscountModel>(entity);
            return result;
        }

        public async Task<BaseDataCollection<DiscountModel>> GetListDiscount(DataGridModel model)
        {

            var listMoney = await _moneyService.GetFullListMoney();
            var listDiscount = await _discountRepositoryService.GetListDiscount(model);
            var listDocument = await _doccumentRepositoryService.GetListDoccuemnt();
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
                DiscountTitle = listMoney.BaseDatas
                                        .Where(m => m.Id.ToString() == dc.DiscountNumber)
                                        .Select(x => x.Title)
                                        .FirstOrDefault(),
                FileInforImage = listDocument.Where(d => d.RecordId == dc.Id)
                                        .Select(x => new FileInforImage
                                        {
                                            ImageSrc = x.FileUrl,
                                            KeyImage = x.Key
                                        })
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

        public async Task UpdateExpiredDiscountAsync()
        {
            var expiredCodes = await _discountRepositoryService.GetExpiredDiscountAsync();
            foreach (var code in expiredCodes)
            {
                code.Status = (int)DiscountCodeStatusEnum.Expired;
                await _discountRepositoryService.UpdateDiscountAsync(code);
            }

            var activeCodes = await _discountRepositoryService.GetActiveDiscountAsync();
            foreach (var code in activeCodes)
            {
                code.Status = (int)DiscountCodeStatusEnum.Active;
                await _discountRepositoryService.UpdateDiscountAsync(code);
            }
        }

        public async Task<DiscountCodeFilterModel> GetListFilterDiscount()
        {
            var result = await _discountRepositoryService.GetListFilterDiscount();
            return result;
        }

        public async Task<DiscountModel> GetDiscountNotice()
        {
            var result = await _discountRepositoryService.GetDiscountNotice();
            return result;
        }
    }
}
