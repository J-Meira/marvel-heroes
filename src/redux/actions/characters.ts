import { setLoading, removeLoading } from '../actions';
import { AppThunk } from '../store';
import {
  getCharacter as getCharacterAction,
  getCharacters as getCharactersAction,
  clearCharacter as clearCharacterAction,
} from '../reducers/characters';
import { IGetAll } from '../../types';
import { CharactersService } from '../../services';

export const getCharacters =
  (params: IGetAll): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const result = await CharactersService.getAll(params);
      if (result) {
        dispatch(getCharactersAction(result));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(removeLoading());
    }
  };

export const getCharacter =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const result = await CharactersService.getById(id);
      dispatch(
        getCharacterAction(
          result && result.data.results[0]
            ? result.data.results[0]
            : undefined,
        ),
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(removeLoading());
    }
  };

export const clearCharacter = (): AppThunk => (dispatch) => {
  dispatch(clearCharacterAction());
};
