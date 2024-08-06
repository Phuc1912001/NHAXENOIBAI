using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NhaXeNoiBai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _mapboxAccessToken;
        private readonly string _sessionToken;  // Thay thế bằng token thực tế hoặc cấu hình

        public SearchController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _mapboxAccessToken = configuration["Mapbox:AccessToken"];
            _sessionToken = "0f0fb953-03be-4021-8911-8aad6d905956"; // Thay thế với session token thực tế nếu cần
        }

        [HttpGet("search-address")]
        public async Task<IActionResult> Get([FromQuery] string q)
        {
            if (string.IsNullOrEmpty(q))
            {
                return BadRequest(new { error = "Query parameter 'q' is required" });
            }

            var encodedQuery = Uri.EscapeDataString(q);
            var url = $"https://api.mapbox.com/search/searchbox/v1/suggest?q={encodedQuery}&language=en&limit=1&session_token={_sessionToken}&country=VN&access_token={_mapboxAccessToken}";

            // Log URL for debugging
            Console.WriteLine("Request URL: " + url);

            try
            {
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, new { error = $"Failed to fetch data: {response.ReasonPhrase}", details = errorContent });
                }

                var content = await response.Content.ReadAsStringAsync();
                return Ok(new { data = content });
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, new { error = "Internal Server Error", details = e.Message });
            }
        }


    }
}
