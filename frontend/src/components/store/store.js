import React from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import uiSlice from './uiSlice'
import saleSlice from './saleSlice'
import userSlice from './userSlice'

const store=configureStore({
    reducer:{
        ui:uiSlice.reducer,
        sale:saleSlice.reducer,
        user:userSlice.reducer,
    }
});

export default store