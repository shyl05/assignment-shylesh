import {configureStore} from '@reduxjs/toolkit';
import {DataSlice} from './slices/DataSlice';
import {setupListeners} from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: DataSlice.reducer,
});
setupListeners(store.dispatch);

export default store;
