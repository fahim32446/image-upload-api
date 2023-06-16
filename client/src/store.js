import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import { vector_endpoints } from './pages/Vector_Wall/Endpoints/vector_endpoints';

const rootReducer = combineReducers({
  user: authReducer,
  [vector_endpoints.reducerPath]: vector_endpoints.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vector_endpoints.middleware), // Add the RTK Query middleware
});

export default store;
