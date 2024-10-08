﻿using Microsoft.AspNetCore.Http;
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

        [HttpGet("getFilterDiscountCode")]
        public async Task<IActionResult> GetListFilterDiscountCode()
        {
            try
            {
                var result = await _discountCodeService.GetListFilterDiscountCode();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy danh sách bộ lọc mã giảm giá.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Đã xảy ra lỗi khi xử lý yêu cầu.");
            }
        }

        [HttpGet("getDiscountCodeChart")]
        public async Task<IActionResult> GetDiscountCodeChart()
        {
            try
            {
                var result = await _discountCodeService.GetDiscountCodeChart();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi lấy danh sách chart mã giảm giá.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Đã xảy ra lỗi khi xử lý yêu cầu.");
            }
        }


        [HttpPost("finDiscountCode")]
        public async Task<BaseResponse<DiscountCodeModel>> FindDiscountCode(string title)
        {
            return await this.Handle(_logger, () => _discountCodeService.FindDiscountCode(title));
        }

        [HttpGet("GetDiscountCodeOverViewModel")]
        public async Task<IActionResult> GetDiscountCodeOverViewModel()
        {
            try
            {
                var result = await _discountCodeService.GetDiscountCodeOverViewModel();
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
