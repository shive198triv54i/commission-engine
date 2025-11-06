# Avalpha Technologies — Commission Calculator API

This is the backend API for the Commission Calculator app.

## Overview

- Framework: ASP.NET Core (net8.0)
- Purpose: Exposes a single endpoint to calculate commissions for Avalpha Technologies and a competitor.

## Prerequisites

- .NET 8 SDK installed: https://dotnet.microsoft.com/
- (Optional) A browser for Swagger UI

## Run the API (Windows PowerShell)

Open PowerShell and run:

```powershell
Set-Location -Path 'd:\assignment3\Assesment-1\api'
dotnet build
# Run using the https launch profile defined in Properties/launchSettings.json
dotnet run --launch-profile "https"
```

This will host the API using the `https` profile. The app's launch settings include:

- HTTPS: https://localhost:5000
- HTTP: http://localhost:5111

Swagger UI will be available at `https://localhost:5000/swagger` while in Development mode.

## Endpoint

- POST /api/Commision

Request body (JSON):

```json
{
  "localSalesCount": 10,
  "foreignSalesCount": 5,
  "averageSaleAmount": 100
}
```

Successful response (JSON):

```json
{
  "avalphaTechnologiesCommissionAmount": 550,
  "competitorCommissionAmount": 95.5
}
```

Notes:

- Controller route uses `api/[controller]` and the controller class is named `CommisionController`. The path therefore is `/api/Commision` (single `s`).
- CORS: The API defines a CORS policy that allows `http://localhost:3000` by default.
  Ensure the frontend origin matches the allowed origin (scheme + host + port) to avoid browser preflight failures (405 on OPTIONS).

## Quick test with curl (insecure - for dev with self-signed certs)

```powershell
curl.exe -k -X POST "https://localhost:5000/api/Commision" \
  -H "Content-Type: application/json" \
  -d '{"localSalesCount":10,"foreignSalesCount":5,"averageSaleAmount":100}'
```

Or use the Swagger UI to run the request interactively.

## Troubleshooting

- 405 responses from the browser when calling from the React app often indicate a missing `app.UseCors(...)` call or a mismatched origin. Confirm `app.UseCors(allowedOrigins);` is present in `Program.cs` and that the origin configured matches your dev server (eg `http://localhost:3000`).
- If you see certificate issues when calling `https://localhost:5000`, either install the dev certificate or use `-k` with curl for local testing.

## Contact

If you need further help, include the request details and browser DevTools network logs (OPTIONS and POST entries).
