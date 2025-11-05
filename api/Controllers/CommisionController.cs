using AvalphaTechnologies.CommissionCalculator.DTOs;
using AvalphaTechnologies.CommissionCalculator.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AvalphaTechnologies.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        private readonly ICommissionService _commissionService;

        public CommisionController(ICommissionService commissionService)
        {
            _commissionService = commissionService;
        }

        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate(CommissionCalculationRequest request)
        {
            var response = _commissionService.CalculateCommission(request);
            return Ok(response);
        }

    }

}
