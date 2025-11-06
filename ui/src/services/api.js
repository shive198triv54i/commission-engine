import { API_BASE_URL, API_ENDPOINTS } from '../config/api';


export const calculateCommission = async (requestData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMMISSION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        localSalesCount: Number(requestData.localSalesCount),
        foreignSalesCount: Number(requestData.foreignSalesCount),
        averageSaleAmount: Number(requestData.averageSaleAmount),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server');
    }
    throw error;
  }
};

