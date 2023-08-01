import { configureStore, combineReducers } from '@reduxjs/toolkit';
import crudslice from './slice/Crudslice';

const rootreducer = combineReducers({
    crud: crudslice.reducer,
});
const store = configureStore({
    reducer: rootreducer
})
export default store;