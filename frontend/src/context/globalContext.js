import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1/`;
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Add state for user data
  const [user, setUser] = useState(null); // Initial state for user (null or the logged-in user)
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (err) => {
    const message = err.response?.data?.message || "Something went wrong.";
    setError(message);
    console.error(message);
  };

  // Example: Set user data (this could be from an API call after login)
  const setUserData = (userData) => {
    setUser(userData);
    // Optionally store user data in localStorage or sessionStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const addIncome = async (income) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}add-income`, income);
      await getIncomes();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getIncomes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      await getIncomes();
    } catch (err) {
      handleError(err);
    }
  };

  const totalIncome = useMemo(
    () => incomes.reduce((total, income) => total + income.amount, 0),
    [incomes]
  );

  const addExpense = async (expense) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}add-expense`, expense);
      await getExpenses();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      await getExpenses();
    } catch (err) {
      handleError(err);
    }
  };

  const totalExpenses = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses]
  );

  const totalBalance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  const transactionHistory = useMemo(() => {
    const history = [...incomes, ...expenses];
    return history
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [incomes, expenses]);

  return (
    <GlobalContext.Provider
      value={{
        user, // Provide user data to the context
        setUserData, // Method to update user data
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
