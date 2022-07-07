import { configureStore } from '@reduxjs/toolkit';
import countReducer  from './reducers/conterSlice';
import documentReducer from './reducers/documentSlice';


export default configureStore({
    reducer: {
        documents: documentReducer,
        count: countReducer 
    },

})