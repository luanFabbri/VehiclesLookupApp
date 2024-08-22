// src/services/redux/rootReducer.ts
import {combineReducers} from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice'; // Exemplo de slice
import authReducer from './slices/authSlice'; // Exemplo de slice

const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
