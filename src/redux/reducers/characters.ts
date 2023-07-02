import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, ICharacterDataWrapper } from '../../types';

export interface CharactersState {
  character: ICharacter | undefined;
  characters: ICharacter[];
  totalOfCharacters: number;
}

const initialState: CharactersState = {
  character: undefined,
  characters: [],
  totalOfCharacters: 0,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharacters: (
      state,
      action: PayloadAction<ICharacterDataWrapper>,
    ) => {
      state.characters = action.payload.data.results;
      state.totalOfCharacters = action.payload.data.total;
    },
    getCharacter: (
      state,
      action: PayloadAction<ICharacter | undefined>,
    ) => {
      state.character = action.payload;
    },
    clearCharacter: (state) => {
      state.character = undefined;
    },
  },
});

export const { getCharacters, getCharacter, clearCharacter } =
  charactersSlice.actions;

export default charactersSlice.reducer;
