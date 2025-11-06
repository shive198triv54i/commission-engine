using AvalphaTechnologies.CommissionCalculator.Services.Interfaces;
using AvalphaTechnologies.CommissionCalculator.Services;

namespace AvalphaTechnologies.CommissionCalculator.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ICommissionService, CommissionService>();

            return services;
        }
    }
}
