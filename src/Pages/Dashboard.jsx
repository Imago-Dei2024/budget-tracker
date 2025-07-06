import React from 'react';
import { useFinance } from '../Context/FinanceContext';
import Card from '../Components/UI/Card';
import { formatCurrency } from '../Utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { calculateExpensesByCategory } from '../Utils/calculations';

const Dashboard = () => {
  const { state, summaryData } = useFinance();
  const { income, expenses, investments, transactions } = state;
  
  // Prepare data for expense breakdown chart
  const expensesByCategory = calculateExpensesByCategory(expenses);
  const expenseChartData = Object.keys(expensesByCategory).map(category => ({
    name: category,
    value: expensesByCategory[category]
  }));
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  // Monthly cash flow data
  const cashFlowData = [
    { name: 'Income', amount: summaryData.totalIncome },
    { name: 'Expenses', amount: summaryData.totalExpenses },
    { name: 'Investments', amount: summaryData.totalInvestments },
    { name: 'Free Cash', amount: summaryData.freeCashFlow }
  ];
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h3 className="text-lg font-medium mb-2">Total Income</h3>
          <p className="text-2xl font-bold">{formatCurrency(summaryData.totalIncome)}</p>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <h3 className="text-lg font-medium mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold">{formatCurrency(summaryData.totalExpenses)}</p>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h3 className="text-lg font-medium mb-2">Total Investments</h3>
          <p className="text-2xl font-bold">{formatCurrency(summaryData.totalInvestments)}</p>
        </Card>
        
        <Card className={`bg-gradient-to-r ${
          summaryData.freeCashFlow >= 0 
            ? 'from-emerald-500 to-emerald-600' 
            : 'from-amber-500 to-amber-600'
        } text-white`}>
          <h3 className="text-lg font-medium mb-2">Free Cash Flow</h3>
          <p className="text-2xl font-bold">{formatCurrency(summaryData.freeCashFlow)}</p>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Expense Breakdown */}
        <Card title="Expense Breakdown">
          <div className="h-64">
            {expenseChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No expense data available</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Monthly Cash Flow */}
        <Card title="Monthly Cash Flow">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      <Card title="Recent Transactions">
        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-24">
            <p className="text-gray-500">No recent transactions</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;