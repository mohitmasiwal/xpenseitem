 
import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
  },
  reducers: {
    setExpenses(state, action) {
      state.items = action.payload;
    },
    addExpense(state, action) {
      state.items.push(action.payload);
    },
    deleteExpense(state, action) {
      state.items = state.items.filter(exp => exp.id !== action.payload);
    },
  },
});

export const { setExpenses, addExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
