using AvalphaTechnologies.CommissionCalculator.DTOs;

namespace AvalphaTechnologies.CommissionCalculator.Services.Interfaces
{
    public interface ICommissionService
    {
        CommissionCalculationResponse CalculateCommission(CommissionCalculationRequest request);
    }
}
