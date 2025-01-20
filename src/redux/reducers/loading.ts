import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    removeLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, removeLoading } = loadingSlice.actions;

export const getLoading = (state: RootState) => state.loading.isLoading;

export default loadingSlice.reducer;
