import {reducer} from './reducer'
import  {createStore,applyMiddleware} from 'redux'
import{persistStore,persistReducer} from 'redux-persist'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import thunk from "redux-thunk"


const configPersist={
    key: "root",
    storage: AsyncStorage
}
const persistedReducer=persistReducer(configPersist,reducer)
export const store=createStore(persistedReducer,applyMiddleware(thunk))
export const persistor=persistStore(store)
