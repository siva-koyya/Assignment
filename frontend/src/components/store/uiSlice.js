// import { theme } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";



const uiSlice =createSlice({
    name:"ui",
    initialState:{
        theme: false,

    },
    reducers:{
        toggle(state,action){
            
        }
    }
})

export const uiAction=uiSlice.actions
export default uiSlice
