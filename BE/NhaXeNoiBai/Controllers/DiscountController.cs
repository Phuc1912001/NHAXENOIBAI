using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Service.Extend;
using NhaXeNoiBai.Service.Interfaces;

namespace NhaXeNoiBai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;
        private readonly ILogger<DiscountController> _logger;
        public DiscountController(IDiscountService discountService, ILogger<DiscountController> logger)
        {
            this._discountService = discountService;
            _logger = logger;   
        }

        [HttpPost("CreateDiscount")]
        public async Task<BaseResponse<DiscountModel>> CreatePrice(DiscountModel model)
        {
            return await this.Handle(_logger, () => _discountService.CreateDiscount(model));
        }

    }
}
