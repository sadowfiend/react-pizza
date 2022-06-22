import { configureStore } from '@reduxjs/toolkit'
import filter from '../redux/slices/filterSclice'


export const store = configureStore({
    reducer: {
        filter
    },
})
