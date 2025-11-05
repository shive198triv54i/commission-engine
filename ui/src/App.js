import logo from './logo.png';
import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommission, clearError } from './store/slices/commissionSlice';

function App() {
  const dispatch = useDispatch();
  const { responseData, isLoading, error } = useSelector((state) => state.commission);

  const [formData, setFormData] = useState({
    localSalesCount: '',
    foreignSalesCount: '',
    averageSaleAmount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestData = {
      localSalesCount: parseFloat(formData.localSalesCount) || 0,
      foreignSalesCount: parseFloat(formData.foreignSalesCount) || 0,
      averageSaleAmount: parseFloat(formData.averageSaleAmount) || 0,
    };

    dispatch(fetchCommission(requestData));
  };

  // Get results from Redux state or default to 0
  const results = {
    avalphaTechnologiesCommission: responseData?.avalphaTechnologiesCommission || 0,
    competitorCommission: responseData?.competitorCommission || 0
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="Avalpha Technologies Logo" />
          <h1 className="company-title">Avalpha Technologies</h1>
          <h2 className="app-subtitle">Commission Calculator</h2>
        </div>
      </header>

      <main className="main-content">
        <div className="calculator-container">
          <div className="form-section">
            <h3>Sales Information</h3>
            <form onSubmit={handleSubmit} className="calculator-form">
              <div className="form-group">
                <label htmlFor="localSalesCount">Local Sales Count</label>
                <input 
                  type="number" 
                  id="localSalesCount"
                  name="localSalesCount"
                  value={formData.localSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of local sales"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="foreignSalesCount">Foreign Sales Count</label>
                <input 
                  type="number" 
                  id="foreignSalesCount"
                  name="foreignSalesCount"
                  value={formData.foreignSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of foreign sales"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="averageSaleAmount">Average Sale Amount (£)</label>
                <input 
                  type="number" 
                  step="0.01"
                  id="averageSaleAmount"
                  name="averageSaleAmount"
                  value={formData.averageSaleAmount}
                  onChange={handleInputChange}
                  placeholder="Enter average sale amount"
                  required
                />
              </div>

              <button 
                type="submit" 
                className={`calculate-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Calculating...' : 'Calculate Commission'}
              </button>
              
              {error && (
                <div className="error-message" style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#fee', 
                  color: '#c33', 
                  borderRadius: '4px',
                  border: '1px solid #fcc'
                }}>
                  <strong>Error:</strong> {error}
                </div>
              )}
            </form>
          </div>

          <div className="results-section">
            <h3>Commission Results</h3>
            <div className="results-grid">
              <div className="result-card avalpha-card">
                <div className="result-header">
                  <h4>Avalpha Technologies</h4>
                  <span className="commission-rates">Local: 20% | Foreign: 35%</span>
                </div>
                <div className="result-amount">
                  £{typeof results.avalphaTechnologiesCommission === 'number' 
                    ? results.avalphaTechnologiesCommission.toFixed(2) 
                    : results.avalphaTechnologiesCommission}
                </div>
              </div>
              
              <div className="result-card competitor-card">
                <div className="result-header">
                  <h4>Competitor</h4>
                  <span className="commission-rates">Local: 2% | Foreign: 7.55%</span>
                </div>
                <div className="result-amount">
                  £{typeof results.competitorCommission === 'number' 
                    ? results.competitorCommission.toFixed(2) 
                    : results.competitorCommission}
                </div>
              </div>
            </div>
            
            {results.avalphaTechnologiesCommission > 0 && (
              <div className="advantage-indicator">
                <p className="advantage-text">
                  Avalpha Technologies advantage: 
                  <strong> £{(
                    (typeof results.avalphaTechnologiesCommission === 'number' 
                      ? results.avalphaTechnologiesCommission 
                      : parseFloat(results.avalphaTechnologiesCommission) || 0) -
                    (typeof results.competitorCommission === 'number' 
                      ? results.competitorCommission 
                      : parseFloat(results.competitorCommission) || 0)
                  ).toFixed(2)}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Avalpha Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
