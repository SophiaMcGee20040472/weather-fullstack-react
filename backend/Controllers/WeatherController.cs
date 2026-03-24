using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WeatherApi.Controllers
{
    [ApiController]
    [Route("api/weather")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _service;

        public WeatherController(WeatherService service)
        {
            _service = service;
        }

        [HttpGet("{city}")]
        [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any, NoStore = false)]
        public async Task<IActionResult> Get(string city)
        {
            try
            {
                var weatherTask = _service.GetWeather(city);
                var timezoneTask = _service.GetTimezone(city);
                var astronomyTask = _service.GetAstronomy(city);

                await Task.WhenAll(weatherTask, timezoneTask, astronomyTask);

                // Parse safely
                using var weatherJson = JsonDocument.Parse(await weatherTask);
                using var timezoneJson = JsonDocument.Parse(await timezoneTask);
                using var astronomyJson = JsonDocument.Parse(await astronomyTask);

                return Ok(new
                {
                    weather = weatherJson.RootElement.Clone(),
                    timezone = timezoneJson.RootElement.Clone(),
                    astronomy = astronomyJson.RootElement.Clone()
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Controller ERROR: {ex.Message}");

                return StatusCode(500, new
                {
                    error = "Failed to fetch weather data",
                    details = ex.Message
                });
            }
        }
    }
}