// Calculate monthly value based on frequency
export const calculateMonthlyValue = (amount, frequency) => {
  switch (frequency) {
    case 'daily':
      return amount * 30;
    case 'weekly':
      return amount * 4.33;
    case 'biweekly':
      return amount * 2.17;
    case 'monthly':
      return amount;
    case 'quarterly':
      return amount / 3;
    case 'annually':
      return amount / 12;
    default:
      return amount;
  }
};

// Calculate future value with compound interest
export const calculateFutureValue = (principal, rate, time, contributions, contributionFrequency) => {
  const monthlyRate = rate / 100 / 12;
  const months = time * 12;
  let futureValue = principal;
  
  // Convert contributions to monthly based on frequency
  const monthlyContribution = calculateMonthlyValue(contributions, contributionFrequency);
  
  for (let i = 0; i < months; i++) {
    futureValue = futureValue * (1 + monthlyRate) + monthlyContribution;
  }
  
  return futureValue;
};

// Calculate net worth projection
export const calculateNetWorthProjection = (
  currentNetWorth,
  monthlyIncome,
  monthlyExpenses,
  monthlyInvestments,
  investmentReturnRate,
  incomeGrowthRate,
  inflationRate,
  years
) => {
  const months = years * 12;
  const monthlyReturnRate = investmentReturnRate / 100 / 12;
  const monthlyIncomeGrowthRate = incomeGrowthRate / 100 / 12;
  const monthlyInflationRate = inflationRate / 100 / 12;
  
  let netWorth = currentNetWorth;
  let currentMonthlyIncome = monthlyIncome;
  let currentMonthlyExpenses = monthlyExpenses;
  let currentMonthlyInvestments = monthlyInvestments;
  let investmentPortfolio = 0;
  
  const projection = [];
  
  for (let month = 0; month <= months; month++) {
    // Add data point for current month
    if (month % 12 === 0) {
      projection.push({
        year: month / 12,
        netWorth,
        investmentPortfolio
      });
    }
    
    // Update values for next month
    currentMonthlyIncome *= (1 + monthlyIncomeGrowthRate);
    currentMonthlyExpenses *= (1 + monthlyInflationRate);
    
    // Adjust investments if income and expenses change
    const freeCashFlow = currentMonthlyIncome - currentMonthlyExpenses;
    currentMonthlyInvestments = Math.min(currentMonthlyInvestments, freeCashFlow);
    
    // Update investment portfolio with returns and new investments
    investmentPortfolio = investmentPortfolio * (1 + monthlyReturnRate) + currentMonthlyInvestments;
    
    // Update net worth
    netWorth += freeCashFlow;
  }
  
  return projection;
};

// Calculate expense breakdown by category
export const calculateExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(amount);
    return acc;
  }, {});
};