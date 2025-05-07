import { configureStore } from "@reduxjs/toolkit";
 import authReduceer from "./Auth"
import themeReducer from "./Theme"
import  expensesReducer from "./expensesSlice"

const store = configureStore({
    reducer: {
      auth: authReduceer,
      theme: themeReducer,
      expenses: expensesReducer,  
    },
  });
  
  export default store;
  