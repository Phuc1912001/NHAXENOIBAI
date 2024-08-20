using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Service.Behaviours;
using NhaXeNoiBai.Service.Extend;
using NhaXeNoiBai.Service.Interfaces;

namespace NhaXeNoiBai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly IPriceService _priceService;
        private readonly ILogger<PriceController> _logger;

        public PriceController(IPriceService priceService, ILogger<PriceController> logger)
        {
            this._priceService = priceService;
            this._logger = logger;
        }

        [HttpPost("GetListPrice")]
        public async Task<BaseResponse<BaseDataCollection<PriceModel>>> GetListPrice([FromBody] DataGridModel model)
        {
            return await this.Handle(_logger, () => _priceService.GetListPrice(model));

        }

        [HttpPost("CreatePrice")]
        public async Task<BaseResponse<PriceModel>> CreatePrice( PriceModel model )
        {
            return await this.Handle(_logger, () => _priceService.CreatePrice(model));  
        }

        [HttpPost("UpdatePrice")]
        public async Task<BaseResponse<PriceModel>> UpdatePrice( PriceModel model)
        {
            return await this.Handle(_logger,() => _priceService.UpdatePrice(model));
        }

        [HttpDelete("{id}")]
        public async Task<BaseResponse<bool>> DeletePrice ( Guid id )
        {
            return await this.Handle(_logger, () => _priceService.DeletePrice(id));
        }

        [HttpGet]
        public async Task<BaseResponse<BaseDataCollection<PriceModel>>> GetFullPriceList()
        {
            return await this.Handle(_logger, () => _priceService.GetFullPriceList());
        }
    }
}
