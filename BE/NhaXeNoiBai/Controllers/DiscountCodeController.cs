using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Service.Behaviours;
using NhaXeNoiBai.Service.Extend;
using NhaXeNoiBai.Service.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace NhaXeNoiBai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountCodeController : ControllerBase
    {
        private readonly IDiscountCodeService _discountCodeService;
        private readonly ILogger<DiscountCodeController> _logger;
        private readonly IServiceProvider _serviceProvider;

        public DiscountCodeController(IDiscountCodeService discountCodeService, ILogger<DiscountCodeController> logger , IServiceProvider serviceProvider)
        {
            _discountCodeService = discountCodeService;
            _logger = logger;
            _serviceProvider = serviceProvider;
        }
        [HttpPost("CreateDiscountCode")]
        public async Task<BaseResponse<DiscountCodeModel>> CreatePrice(DiscountCodeModel model)
        {
            return await this.Handle(_logger, () => _discountCodeService.CreateDiscountCode(model));
        }

        [HttpPost("GetListDiscountCode")]
        public async Task<BaseResponse<BaseDataCollection<DiscountCodeModel>>> GetListDiscountCode([FromBody] DataGridModel model)
        {
            return await this.Handle(_logger, () => _discountCodeService.GetListDiscountCode(model));

        }

        [HttpPost("UpdateDiscountCode")]
        public async Task<BaseResponse<DiscountCodeModel>> UpdateDiscountCode(DiscountCodeModel model)
        {
            return await this.Handle(_logger, () => _discountCodeService.UpdateDiscountCode(model));

        }
        [HttpDelete("{id}")]
        public async Task<BaseResponse<bool>> DeleteDiscountCode(Guid id)
        {
            return await this.Handle(_logger, () => _discountCodeService.DeleteDiscountCode(id));
        }

      
    }
}
