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

        [HttpPost("GetListDiscount")]
        public async Task<BaseResponse<BaseDataCollection<DiscountModel>>> GetListDiscountCode([FromBody] DataGridModel model)
        {
            return await this.Handle(_logger, () => _discountService.GetListDiscount(model));

        }

        [HttpPost("UpdateDiscount")]
        public async Task<BaseResponse<DiscountModel>> UpdateDiscountCode(DiscountModel model)
        {
            return await this.Handle(_logger, () => _discountService.UpdateDiscount(model));

        }
        [HttpDelete("{id}")]
        public async Task<BaseResponse<bool>> DeleteDiscountCode(Guid id)
        {
            return await this.Handle(_logger, () => _discountService.DeleteDiscount(id));
        }

        [HttpGet("getFilterDiscount")]
        public async Task<IActionResult> GetListFilterDiscount()
        {
            try
            {
                var result = await _discountService.GetListFilterDiscount();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy danh sách bộ lọc khuyến mãi.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Đã xảy ra lỗi khi xử lý yêu cầu.");
            }
        }

        [HttpGet("getNotice")]
        public async Task<IActionResult> GetDiscountNotice()
        {
            try
            {
                var result = await _discountService.GetDiscountNotice();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy thống báo khuyến mãi.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Đã xảy ra lỗi khi xử lý yêu cầu.");
            }
        }

        [HttpGet("getDiscountChart")]
        public async Task<IActionResult> GetDiscountChart()
        {
            try
            {
                var result = await _discountService.GetDiscountChart();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy danh sách chart khuyến mãi.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Đã xảy ra lỗi khi xử lý yêu cầu.");
            }
        }

    }
}
