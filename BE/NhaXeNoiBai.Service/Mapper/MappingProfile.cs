using AutoMapper;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Mapper
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<PriceEntity, PriceModel>();
            CreateMap<PriceModel,PriceEntity>();

            CreateMap<DiscountEntity, DiscountModel>();
            CreateMap<DiscountModel, DiscountEntity>();

            CreateMap<DiscountCodeEntity, DiscountCodeModel>();
            CreateMap<DiscountCodeModel, DiscountCodeEntity>();

            CreateMap<MoneyEntity, MoneyModel>();
            CreateMap<MoneyModel, MoneyEntity>();
        }
    }
}
