using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddHttpClient<WeatherService>(client =>
{
    client.BaseAddress = new Uri("https://weatherapi-com.p.rapidapi.com/");
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173",
                    "https://mycityweatherapp.vercel.app"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddResponseCompression();

var port = Environment.GetEnvironmentVariable("PORT") ?? "5168";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseResponseCompression();

app.MapControllers();

app.Run();