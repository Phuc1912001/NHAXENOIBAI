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
    public class BookCarController : ControllerBase
    {
        private readonly IBookCarService _bookCarService;
        private readonly ILogger<DiscountController> _logger;

        public BookCarController(IBookCarService bookCarService, ILogger<DiscountController> logger)
        {
            _bookCarService = bookCarService;
            _logger = logger;
        }

        [HttpPost("GetListBookCar")]
        public async Task<BaseResponse<BaseDataCollection<BookCarModel>>> GetListBookCar([FromBody] DataGridModel model)
        {
            return await this.Handle(_logger, () =>_bookCarService.GetListBooKCar(model));

        }

        [HttpPost("CreateBookCar")]
        public async Task<BaseResponse<BookCarModel>> CreateBookCar(BookCarModel model)
        {
            return await this.Handle(_logger, () => _bookCarService.CreateBookCar(model));
        }

        [HttpDelete("{id}")]
        public async Task<BaseResponse<bool>> DeleteBookCar(Guid id)
        {
            return await this.Handle(_logger, () => _bookCarService.DeleteBookCar(id));
        }

        [HttpGet("getFilterBookCar")]
        public async Task<IActionResult> GetListFilterDiscountCode()
        {
            try
            {
                var result = await _bookCarService.GetBookCarFilter();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy danh sách bộ book car.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Đã xảy ra lỗi khi xử lý yêu cầu.");
            }
        }
    }
}
