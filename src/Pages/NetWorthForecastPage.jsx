import React, { useState, } from 'react';
import { useFinance } from '../Context/FinanceContext';
import Card from '../Components/UI/Card';
import Input from '../Components/UI/Input';
import Button from '../Components/UI/Button';
import { calculateNetWorthProjection } from '../Utils/calculations';
import { formatCurrency } from '../Utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NetWorthForecastPage = () => {
  const { summaryData } = useFinance();
  
  const [settings, setSettings] = useState({
    currentNetWorth: 0,
    yearsToProject: 10,
    investmentReturnRate: 7,
    incomeGrowthRate: 3,
    inflationRate: 2.5,
  });

  const [projectionData, setProjectionData] = useState([]);

  const handleChange = (e) => {
    setSettings(prev => ({ ...prev, [e.target.name]: parseFloat(e.target.value) || 0 }));
  };

  const handleProjection = () => {
    const projection = calculateNetWorthProjection(
      settings.currentNetWorth,
      summaryData.totalIncome,
      summaryData.totalExpenses,
      summaryData.totalInvestments,
      settings.investmentReturnRate,
      settings.incomeGrowthRate,
      settings.inflationRate,
      settings.yearsToProject
    );
    setProjectionData(projection);
  };
  
  // Run initial projection on component mount
  React.useEffect(() => {
    handleProjection();
  }, [summaryData]); // Recalculate if summary data changes

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Net Worth Forecast</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Projection Settings">
            <div className="space-y-4">
              <Input label="Current Net Worth" id="currentNetWorth" name="currentNetWorth" type="number" value={settings.currentNetWorth} onChange={handleChange} />
              <Input label="Years to Project" id="yearsToProject" name="yearsToProject" type="number" value={settings.yearsToProject} onChange={handleChange} />
              <Input label="Annual Investment Return (%)" id="investmentReturnRate" name="investmentReturnRate" type="number" step="0.1" value={settings.investmentReturnRate} onChange={handleChange} />
              <Input label="Annual Income Growth (%)" id="incomeGrowthRate" name="incomeGrowthRate" type="number" step="0.1" value={settings.incomeGrowthRate} onChange={handleChange} />
              <Input label="Annual Inflation Rate (%)" id="inflationRate" name="inflationRate" type="number" step="0.1" value={settings.inflationRate} onChange={handleChange} />
            </div>
            <div className="mt-6">
              <Button onClick={handleProjection} className="w-full">
                Run Projection
              </Button>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title={`Net Worth Projection over ${settings.yearsToProject} Years`}>
            <div className="h-96">
              {projectionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="netWorth" stroke="#8884d8" name="Net Worth" />
                    <Line type="monotone" dataKey="investmentPortfolio" stroke="#82ca9d" name="Investments" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                 <div className="flex items-center justify-center h-full">
                   <p className="text-gray-500">Run projection to see results.</p>
                 </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NetWorthForecastPage;