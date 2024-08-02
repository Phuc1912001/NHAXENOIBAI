using NhaXeNoiBai.Service.Interfaces;

namespace NhaXeNoiBai.Controllers
{
    public class DiscountCodeBackgroundService: BackgroundService
    {
        private readonly ILogger<DiscountCodeBackgroundService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public DiscountCodeBackgroundService(ILogger<DiscountCodeBackgroundService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Discount Code Background Service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Discount Code Background Service is running.");

                using (var scope = _serviceProvider.CreateScope())
                {
                    var discountCodeService = scope.ServiceProvider.GetRequiredService<IDiscountCodeService>();
                    var discountService = scope.ServiceProvider.GetRequiredService<IDiscountService>();
                    await discountCodeService.UpdateExpiredDiscountCodesAsync();
                    await discountService.UpdateExpiredDiscountAsync();
                }

                await Task.Delay(TimeSpan.FromSeconds(20), stoppingToken); // Chạy lại sau mỗi 5 phút
            }

            _logger.LogInformation("Discount Code Background Service is stopping.");
        }
    }
}
