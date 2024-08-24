import { configureStore } from '@reduxjs/toolkit'
import incomeSlice from './incomeSlice'
import expenseSlice from './expenseSlice'

const appStore = configureStore({
    reducer:{
        income:incomeSlice,
        expense:expenseSlice
    }
})

export default appStore