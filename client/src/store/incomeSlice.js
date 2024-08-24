import { createSlice } from '@reduxjs/toolkit';

export const incomeSlice = createSlice({
    name: 'incomeSlice',
    initialState: {
        incomes: [],
    },
    reducers: {
        initialIncome: (state, action) => {
            state.incomes = action.payload ;
        },
        addIncome:(state,action)=>{
            state.incomes.push(action.payload);
        },
        removeIncome: (state, action) => {
            state.incomes = state.incomes.filter(item => item._id !== action.payload._id);
        },
    },
});

export const {initialIncome, addIncome, removeIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
