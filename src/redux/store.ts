import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loadingReducer from './reducers/loading';
import charactersReducer from './reducers/characters';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    loading: loadingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
