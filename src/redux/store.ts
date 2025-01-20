import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import charactersReducer from './reducers/characters';
import loadingReducer from './reducers/loading';

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
