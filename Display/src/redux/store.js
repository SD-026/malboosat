import authSlice  from "./authSlice"
import {combineReducers,configureStore}  from '@reduxjs/toolkit'
import ProducttSlice from './producttSlice'
import socketSlice from './socketSlice'
import chatSlice from './chatSlice'
import rtnSlice from './rtnSlice'
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER    
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version:1,
    storage,
}

const rootReducer=combineReducers({
    auth:authSlice,
    Products:ProducttSlice,
    socketio:socketSlice,
    chat:chatSlice,
    notifications:rtnSlice
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
})

export default store;
export const persistor = persistStore(store);
