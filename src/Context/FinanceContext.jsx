import React, { createContext, useContext, useReducer, useMemo } from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';
import { calculateMonthlyValue } from '../Utils/calculations';

// Create the context
const FinanceContext = createContext();

// Action types
const actionTypes = {
  ADD_INCOME: 'ADD_INCOME',
  UPDATE_INCOME: 'UPDATE_INCOME',
  DELETE_INCOME: 'DELETE_INCOME',
  ADD_EXPENSE: 'ADD_EXPENSE',
  UPDATE_EXPENSE: 'UPDATE_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  ADD_INVESTMENT: 'ADD_INVESTMENT',
  UPDATE_INVESTMENT: 'UPDATE_INVESTMENT',
  DELETE_INVESTMENT: 'DELETE_INVESTMENT',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
};

// Initial state
const initialState = {
  income: [],
  expenses: [],
  investments: [],
  transactions: [],
};

// Reducer function
const financeReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_INCOME:
      return { ...state, income: [...state.income, action.payload] };
    case actionTypes.UPDATE_INCOME:
      return {
        ...state,
        income: state.income.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionTypes.DELETE_INCOME:
      return {
        ...state,
        income: state.income.filter(item => item.id !== action.payload),
      };
    case actionTypes.ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case actionTypes.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionTypes.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(item => item.id !== action.payload),
      };
    case actionTypes.ADD_INVESTMENT:
      return { ...state, investments: [...state.investments, action.payload] };
    case actionTypes.UPDATE_INVESTMENT:
      return {
        ...state,
        investments: state.investments.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionTypes.DELETE_INVESTMENT:
      return {
        ...state,
        investments: state.investments.filter(item => item.id !== action.payload),
      };
    case actionTypes.ADD_TRANSACTION:
      return { ...state, transactions: [...state.transactions, action.payload] };
    case actionTypes.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionTypes.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Provider component
const FinanceProvider = ({ children }) => {
  // Use localStorage to persist data
  const [storedState, setStoredState] = useLocalStorage('financeData', initialState);
  
  // Use reducer with stored state
  const [state, dispatch] = useReducer(financeReducer, storedState);

  // Update localStorage whenever state changes
  React.useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  // Calculate summary data
  const summaryData = useMemo(() => {
    const totalIncome = state.income.reduce((sum, item) => {
      return sum + calculateMonthlyValue(parseFloat(item.amount) || 0, item.frequency);
    }, 0);

    const totalExpenses = state.expenses.reduce((sum, item) => {
      return sum + calculateMonthlyValue(parseFloat(item.amount) || 0, item.frequency);
    }, 0);

    const totalInvestments = state.investments.reduce((sum, item) => {
      return sum + calculateMonthlyValue(parseFloat(item.amount) || 0, item.frequency);
    }, 0);

    const freeCashFlow = totalIncome - totalExpenses - totalInvestments;

    return {
      totalIncome,
      totalExpenses,
      totalInvestments,
      freeCashFlow,
    };
  }, [state]);

  const value = {
    state,
    dispatch,
    actionTypes,
    summaryData,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

// Custom hook to use the context
const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

// Export everything
export { FinanceProvider, useFinance, actionTypes };

export default FinanceContext;