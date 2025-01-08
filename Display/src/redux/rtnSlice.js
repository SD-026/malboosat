import {createSlice} from '@reduxjs/toolkit'

const rtnSlice=createSlice({
    name:'notifications',
    initialState:{
        likenotification:[],
        // storemessages:[]
       
    },
    reducers:{
        setlikenotification:(state,action)=>{
            if(action.payload.type==='like'){
            state.likenotification.push(action.payload)
            }else{
                state.likenotification=state.likenotification.filter((item)=>item.userID!==action.payload.userID)
            }
        },
        
    }
})

export const  {setlikenotification} =rtnSlice.actions
export default rtnSlice.reducer;