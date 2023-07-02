import {
  setLoading as setLoadingAction,
  removeLoading as removeLoadingAction,
} from '../reducers/loading';
import { AppThunk } from '../store';

export const setLoading = (): AppThunk => (dispatch) => {
  dispatch(setLoadingAction());
};

export const removeLoading = (): AppThunk => (dispatch) => {
  dispatch(removeLoadingAction());
};
