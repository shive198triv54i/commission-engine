using AvalphaTechnologies.CommissionCalculator.DTOs;
using System.Net;
using System.Text.Json;

namespace AvalphaTechnologies.CommissionCalculator.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Validation error");
                await HandleExceptionAsync(context, ex, HttpStatusCode.BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");
                await HandleExceptionAsync(context, ex, HttpStatusCode.InternalServerError);
            }
            
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception ex, HttpStatusCode statusCode)
        {
            var errorResponse = new ErrorResponse
            {
                Message = ex.Message,
                Details = statusCode == HttpStatusCode.InternalServerError ? "An unexpected error occurred." : ex.Message,
                StatusCode = (int)statusCode
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(errorResponse, options);
            await context.Response.WriteAsync(json);
        }
    }
}
