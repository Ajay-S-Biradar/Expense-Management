import { createSlice } from '@reduxjs/toolkit';

export const expenseSlice = createSlice({
    name: 'expenseSlice',
    initialState: {
        expenses: [],
    },
    reducers: {
        initialExpense: (state, action) => {
            state.expenses = action.payload ;
        },
        addExpense:(state,action)=>{
            state.expenses.push(action.payload);
        },
        removeExpense: (state, action) => {
            state.expenses = state.expenses.filter(item => item._id !== action.payload._id);
        },
    },
});

export const {initialExpense, addExpense, removeExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
