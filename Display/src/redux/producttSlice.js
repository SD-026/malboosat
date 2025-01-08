import {createSlice} from '@reduxjs/toolkit'

const ProducttSlice=createSlice({
    name:'Products',
    initialState:{
        All_Products:[],
       
    },
    reducers:{
        setAll_Products:(state,action)=>{
            state.All_Products=action.payload
        },
        // setToken:(state,action)=>{
        //     state.token=action.payload
        // },
        // logout:(state)=>{
        //     state.user=null
        //     state.token=null
        // }
    }
})

export const  {setAll_Products} =ProducttSlice.actions
export default ProducttSlice.reducer;