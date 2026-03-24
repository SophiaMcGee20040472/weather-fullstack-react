using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Create builder
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddHttpClient<WeatherService>(client =>
{
    client.BaseAddress = new Uri("https://weatherapi-com.p.rapidapi.com/");
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddResponseCompression();

// Build app
var app = builder.Build();

// Middleware
app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseResponseCompression();

app.UseAuthorization();

app.MapControllers();

app.Run();