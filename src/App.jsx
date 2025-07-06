import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Layout/Sidebar';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Dashboard from './Pages/Dashboard';
import BudgetPage from './Pages/BudgetPage';
import ExpenseTrackingPage from './Pages/ExpenseTrackingPage';
import NetWorthForecastPage from './Pages/NetWorthForecastPage';
import { FinanceProvider } from './Context/FinanceContext';

function App() {
  return (
    <FinanceProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col md:ml-64">
            <Navbar />
            <main className="flex-1 overflow-y-auto pt-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/budget" element={<BudgetPage />} />
                <Route path="/expenses" element={<ExpenseTrackingPage />} />
                <Route path="/forecast" element={<NetWorthForecastPage />} />
                {/* Add a settings page route if needed */}
                {/* <Route path="/settings" element={<SettingsPage />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </FinanceProvider>
  );
}

export default App;