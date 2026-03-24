using System;
using System.Net.Http;
using System.Threading.Tasks;

public class WeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;

        var apiKey = Environment.GetEnvironmentVariable("RAPIDAPI_KEY");

        if (string.IsNullOrEmpty(apiKey))
        {
            throw new Exception("RAPIDAPI_KEY is not set in environment variables");
        }

        _httpClient.BaseAddress = new Uri("https://weatherapi-com.p.rapidapi.com/");

        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Key", apiKey);
        _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");
    }

    public async Task<string> GetWeather(string city)
    {
        return await SendRequest($"current.json?q={city}");
    }

    public async Task<string> GetTimezone(string city)
    {
        return await SendRequest($"timezone.json?q={city}");
    }

    public async Task<string> GetAstronomy(string city)
    {
        return await SendRequest($"astronomy.json?q={city}");
    }

    private async Task<string> SendRequest(string endpoint)
    {
        try
        {
            var response = await _httpClient.GetAsync(endpoint);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"API Error: {response.StatusCode} - {error}");
            }

            return await response.Content.ReadAsStringAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"WeatherService ERROR: {ex.Message}");
            throw;
        }
    }
}