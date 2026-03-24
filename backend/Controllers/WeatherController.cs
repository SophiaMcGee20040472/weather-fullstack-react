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
    var weatherTask = _service.GetWeather(city);
    var timezoneTask = _service.GetTimezone(city);
    var astronomyTask = _service.GetAstronomy(city);

    await Task.WhenAll(weatherTask, timezoneTask, astronomyTask);

    using var weatherJson = JsonDocument.Parse(weatherTask.Result);
    using var timezoneJson = JsonDocument.Parse(timezoneTask.Result);
    using var astronomyJson = JsonDocument.Parse(astronomyTask.Result);

    return Ok(new
    {
        weather = weatherJson.RootElement.Clone(),    
        timezone = timezoneJson.RootElement.Clone(),   
        astronomy = astronomyJson.RootElement.Clone()  
    });
}
    }
}