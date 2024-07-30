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
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepositoryService _discountRepositoryService;
        private readonly IMapper _mapper;
        public DiscountService(IDiscountRepositoryService discountRepositoryService, IMapper mapper)
        {
          this._discountRepositoryService = discountRepositoryService;
            this._mapper = mapper;
        }
        public async Task<DiscountModel> CreateDiscount(DiscountModel discountModel)
        {
            var discountEntity = _mapper.Map<DiscountEntity>(discountModel);
            var entity = await _discountRepositoryService.CreateDiscount(discountEntity);
            var result = _mapper.Map<DiscountModel>(entity);
            return result;
        }

        public Task<DiscountModel> UpdateDiscount(DiscountModel discountModel)
        {
            throw new NotImplementedException();
        }
    }
}
