import { createSlice } from "@reduxjs/toolkit";
import { CUSTOMER_DATA } from "../data/data";
import {USER_DATA} from '../data/data'
// import jwt from 'jsonwebtoken'
const userSlice=createSlice({
    name:'user',
    initialState:{
        userData:USER_DATA,
        credentials:[],
        isLogin:false,
    },
    reducers:{
        loginClick(state,action){
                const user=action.payload
                const existing = state.credentials.filter((value)=> value.email ===user.email);
                console.log('---->existing',existing)
               if(user){
               state.credentials=[user ? user : null] 
               state.isLogin=true
               }
               console.log(state.credentials,"credentiallss");
        }
    }
})

export const userActions = userSlice.actions
export default userSlice