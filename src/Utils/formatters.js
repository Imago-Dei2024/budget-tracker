// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get month name from date
export const getMonthName = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'long' });
};

// Group transactions by month
export const groupByMonth = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(transaction);
    return acc;
  }, {});
};