import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { PRODUCT_DATA } from "../data/data";

const saleSlice =createSlice({
    name:"sale",
    initialState:{
        products:PRODUCT_DATA,
        Sku:[],
        EditedSale:[]
        
    },
    reducers:{
            sendDataTOForm(state,action){
                    console.log("--->saleProducts",action.payload)
                    const filtered = state.products.filter((value,index)=>( value.id ===action.payload));
                    const filter = filtered.find((value)=>value.sku===value.sku);
                    if(filtered){
                    //    state.Sku.push()
                    }
                    
                //     console.log("---->filter",JSON.stringify(filter)) 
            },
            EditData(state,action){
                    console.log("editedsale",action.payload);
                const payload = action.payload
                const existingItem = state.EditedSale.find((value)=> value.customer_id === payload.customer_id)   
                 console.log("findeded item",existingItem)
                 if(existingItem !== undefined){
                         state.EditedSale=[...state.EditedSale,existingItem]    
                }else{
                        const filterItem = state.EditedSale.filter((value)=>value.customer_id !== existingItem.customer_id)
                        state.EditedSale=[...state.EditedSale,payload]
                }
                 console.log("exxxxx",state.EditedSale);
            }
    }
})

export const saleActions = saleSlice.actions
export default saleSlice