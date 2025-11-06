using AvalphaTechnologies.CommissionCalculator.Middleware;

namespace AvalphaTechnologies.CommissionCalculator.Extensions
{
    public static class ExceptionHandlingMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionHandlingMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ExceptionHandlingMiddleware>();
        }
    }
}
