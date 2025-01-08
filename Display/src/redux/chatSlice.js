import {createSlice} from '@reduxjs/toolkit'

const chatSlice=createSlice({
    name:'chat',
    initialState:{
        OnLineUsers:[],
        storemessages:[]
       
    },
    reducers:{
        setOnLineUsers:(state,action)=>{
            state.OnLineUsers=action.payload
        },
        setmessages:(state,action)=>{
            state.storemessages=action.payload
        },
    }
})

export const  {setOnLineUsers,setmessages} =chatSlice.actions
export default chatSlice.reducer;