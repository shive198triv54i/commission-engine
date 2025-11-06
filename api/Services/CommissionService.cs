using AvalphaTechnologies.CommissionCalculator.DTOs;
using AvalphaTechnologies.CommissionCalculator.Services.Interfaces;

namespace AvalphaTechnologies.CommissionCalculator.Services
{
    public class CommissionService : ICommissionService
    {
        private const decimal AvalphaLocalRate = 0.20m;
        private const decimal AvalphaForeignRate = 0.35m;
        private const decimal CompetitorLocalRate = 0.02m;
        private const decimal CompetitorForeignRate = 0.0755m;
        public CommissionCalculationResponse CalculateCommission(CommissionCalculationRequest request)
        {
            if (request.LocalSalesCount < 0 || request.ForeignSalesCount < 0 || request.AverageSaleAmount < 0)
                throw new ArgumentException("All inputs must be non-negative.");

            decimal avalphaLocal = AvalphaLocalRate * request.LocalSalesCount * request.AverageSaleAmount;
            decimal avalphaForeign = AvalphaForeignRate * request.ForeignSalesCount * request.AverageSaleAmount;
            decimal avalphaTotal = avalphaLocal + avalphaForeign;

            decimal compLocal = CompetitorLocalRate * request.LocalSalesCount * request.AverageSaleAmount;
            decimal compForeign = CompetitorForeignRate * request.ForeignSalesCount * request.AverageSaleAmount;
            decimal compTotal = compLocal + compForeign;

            return new CommissionCalculationResponse
            {
                AvalphaTechnologiesCommissionAmount = Math.Round(avalphaTotal, 2),
                CompetitorCommissionAmount = Math.Round(compTotal, 2)
            };
        }
    }
}
