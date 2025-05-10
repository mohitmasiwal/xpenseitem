 import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { setExpenses, addExpense, deleteExpense } from '../storeredux/expensesSlice';
import { activatepremium } from '../storeredux/Auth';

const Home = () => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const uid = localStorage.getItem("uid");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    if (!amount || !description || !category) {
      alert('Please fill all fields.');
      return;
    }

    const newExpense = { amount, description, category };

    try {
      const res = await axios.post(
        `https://auth-96aa2-default-rtdb.firebaseio.com/expense/${uid}.json`,
        newExpense
      );
      const id = res.data.name;
      dispatch(addExpense({ id, ...newExpense }));

      // Clear input fields after successful submission
      amountRef.current.value = '';
      descriptionRef.current.value = '';
      categoryRef.current.value = '';
    } catch (err) {
      console.error('Error saving expense:', err);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://auth-96aa2-default-rtdb.firebaseio.com/expense/${uid}.json`
      );
      const data = res.data;

      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({ id: key, ...data[key] });
      }

      dispatch(setExpenses(loadedExpenses));
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      await axios.delete(
        `https://auth-96aa2-default-rtdb.firebaseio.com/expense/${uid}/${id}.json`
      );
      dispatch(deleteExpense(id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const downloadCSV = () => {
    if (!expenses.length) return;

    const headers = ['Amount', 'Description', 'Category'];
    const rows = expenses.map((exp) => [exp.amount, exp.description, exp.category]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'expenses.csv');
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  useEffect(() => {
      getData();
  }, []);

  return (
    <div className={`max-w-4xl mx-auto mt-10 p-6 border rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-3xl font-bold mb-4 text-center text-yellow-400">Add Daily Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount Spent (₹)"
          ref={amountRef}
          className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          ref={descriptionRef}
          className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          ref={categoryRef}
          className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue=""
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all w-full"
        >
          Add Expense
        </button>
      </form>

      {expenses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Your Expenses</h3>
          <ul className="space-y-3">
            {expenses.map((exp) => (
              <li key={exp.id} className="border px-4 py-3 rounded-lg bg-gray-100 flex justify-between items-center hover:bg-gray-200 transition">
                <span>₹{exp.amount} - {exp.description} ({exp.category})</span>
                <button
                  onClick={() => deleteExpenseHandler(exp.id)}
                  className="text-red-600 font-bold hover:text-red-700 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center">
            <h1 className="text-lg font-semibold text-gray-700">Total Expenses: ₹{totalExpenses}</h1>
            {totalExpenses > 50 ? (
              <button onClick={() => dispatch(activatepremium())} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all mt-4">Activate Premium</button>
            ) : (
              <button className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed mt-4">Premium Locked</button>
            )}

            <br />
            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all mt-4"
            >
              Download Expenses as CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
