using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class WeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;

        var apiKey = config["WeatherApi:ApiKey"];
        var host = config["WeatherApi:Host"];

        _httpClient.BaseAddress = new Uri("https://weatherapi-com.p.rapidapi.com/");
        _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Key", apiKey);
        _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Host", host);
    }

    public Task<string> GetWeather(string city) =>
        _httpClient.GetStringAsync($"current.json?q={city}");

    public Task<string> GetTimezone(string city) =>
        _httpClient.GetStringAsync($"timezone.json?q={city}");

    public Task<string> GetAstronomy(string city) =>
        _httpClient.GetStringAsync($"astronomy.json?q={city}");
}