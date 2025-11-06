/**
 * @typedef {Object} CommissionRequest
 * @property {number} localSalesCount - Number of local sales
 * @property {number} foreignSalesCount - Number of foreign sales
 * @property {number} averageSaleAmount - Average sale amount
 */

/**
 * @typedef {Object} CommissionResponse
 * @property {number} avalphaTechnologiesCommission - Commission amount for Avalpha Technologies
 * @property {number} competitorCommission - Commission amount for competitor
 */

/**
 * @typedef {Object} CommissionState
 * @property {CommissionRequest|null} requestData - Current request data
 * @property {CommissionResponse|null} responseData - API response data
 * @property {boolean} isLoading - Loading state
 * @property {string|null} error - Error message if any
 */

export {};
