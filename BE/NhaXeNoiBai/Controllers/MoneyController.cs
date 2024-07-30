using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NhaXeNoiBai.Model.Entities;
using NhaXeNoiBai.Model.Model;
using NhaXeNoiBai.Service.Behaviours;
using NhaXeNoiBai.Service.Extend;
using NhaXeNoiBai.Service.Interfaces;

namespace NhaXeNoiBai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoneyController : ControllerBase
    {
        private readonly ILogger<MoneyController> _logger;
        private readonly IMoneyService _moneyService;
        public MoneyController(ILogger<MoneyController> logger, IMoneyService moneyService)
        {
            _logger = logger;
            _moneyService = moneyService;
        }

        [HttpPost("CreateMoney")]
        public async Task<BaseResponse<MoneyModel>> CreateMoney(MoneyModel model)
        {
            return await this.Handle(_logger, () => _moneyService.CreateMoney(model));
        }

        [HttpPost("GetListMoney")]
        public async Task<BaseResponse<BaseDataCollection<MoneyModel>>> GetListMoney([FromBody] DataGridModel model)
        {
            return await this.Handle(_logger, () => _moneyService.GetListMoney(model));

        }
        [HttpPost("UpdateMoney")]
        public async Task<BaseResponse<MoneyModel>> UpdateMoney(MoneyModel model)
        {
            return await this.Handle(_logger, () => _moneyService.UpdateMoney(model));
        }

        [HttpDelete("{id}")]
        public async Task<BaseResponse<bool>> DeletePrice(Guid id)
        {
            return await this.Handle(_logger, () => _moneyService.DeleteMoney(id));
        }
        [HttpGet]
        public async Task<BaseResponse<BaseDataCollection<MoneyModel>>> GetFullListMoney()
        {
            return await this.Handle(_logger, () => _moneyService.GetFullListMoney());
        }
    }
}
