import axios from 'axios';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses, addExpense, deleteExpense } from '../storeredux/expensesSlice';  
import { saveAs } from 'file-saver';


const Home = () => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

   
  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    if (!amount || !description || !category) {
      alert("Please fill all fields.");
      return;
    }

    const newExpense = { amount, description, category };

    axios.post("https://expense-d29c0-default-rtdb.firebaseio.com/expense.json", newExpense)
      .then((res) => {
        const id = res.data.name;  
        dispatch(addExpense({ id, ...newExpense }));
      })
      .catch((err) => {
        console.log("Error saving expense:", err);
      });
      
      amountRef.current.value = '';
      descriptionRef.current.value = '';
      categoryRef.current.value = '';
    };
    
    let totalexpenses = expenses.reduce((sum ,itm)=>sum + Number(itm.amount) ,0)
  

  const getData = () => {
    axios.get("https://expense-d29c0-default-rtdb.firebaseio.com/expense.json")
      .then((res) => {
        const data = res.data;
        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            ...data[key],
          });
        }

        dispatch(setExpenses(loadedExpenses));
      })
      .catch((err) => {
        console.log("Error fetching expenses:", err);
      });
  };

 
  const deletexpnses = (id) => {
    axios.delete(`https://expense-d29c0-default-rtdb.firebaseio.com/expense/${id}.json`)
      .then(() => {
        dispatch(deleteExpense(id));
      })
      .catch((err) => {
        console.log("Error deleting expense:", err);
      });
  };

  const downloadCSV = () => {
    if (!expenses.length) return;

    const headers = ["Amount", "Description", "Category"];
    const rows = expenses.map(exp => [exp.amount, exp.description, exp.category]);

    const csvContent = [
      headers.join(","),  
      rows.map(row => row.join(","))  
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
   
    saveAs(blob, "expenses.csv");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 border rounded shadow ${isDarkMode ? 'bg-gray-900 text-gray-700' : 'bg-blue-600 text-red'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Add Daily Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount Spent (₹)"
          ref={amountRef}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          ref={descriptionRef}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          ref={categoryRef}
          className="w-full border px-3 py-2 rounded"
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Add Expense
        </button>
      </form>

      {expenses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Your Expenses</h3>
          <ul className="space-y-2">
            {expenses.map((exp) => (
              <li key={exp.id} className="border px-3 py-2 rounded bg-gray-100 flex justify-between items-center">
                <span>₹{exp.amount} - {exp.description} ({exp.category})</span>
                <div className="space-x-2">
                  <button onClick={() => deletexpnses(exp.id)} className="text-red-600 font-bold">Delete</button>
                  
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 text-center">
            <h1>total expenses :{totalexpenses }</h1>
            {totalexpenses > 50 ? (
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Activate Premium</button>
          ) : (
            <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">Premium Locked</button>
          )}
          <br />
            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
