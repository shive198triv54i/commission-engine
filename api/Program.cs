
using AvalphaTechnologies.CommissionCalculator.Extensions;
using AvalphaTechnologies.CommissionCalculator.Services;
using AvalphaTechnologies.CommissionCalculator.Services.Interfaces;

namespace AvalphaTechnologies.CommissionCalculator
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddApplicationServices();

            var allowedOrigins = "_allowedOrigins";

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: allowedOrigins,
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000")    
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            app.UseExceptionHandlingMiddleware();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Apply CORS policy so browser preflight (OPTIONS) requests are handled
            // without returning 405 Method Not Allowed.
            app.UseCors(allowedOrigins);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
