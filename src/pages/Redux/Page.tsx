import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Grid } from '@mui/material';
import { useDebounce } from '@j-meira/mui-theme';

import { useAppDispatch, useAppSelector } from '../../redux';

import {
  CharacterDetails,
  CharactersList,
  Loading,
} from '../../components';

import {
  clearCharacter,
  getCharacter,
  getCharacters,
} from '../../redux/actions';
import { getLoading } from '../../redux/reducers';

export const Page = () => {
  const { id } = useParams();
  const isLoading = useAppSelector(getLoading);
  const character = useAppSelector((state) => state.characters.character);
  const characters = useAppSelector(
    (state) => state.characters.characters,
  );
  const totalOfCharacters = useAppSelector(
    (state) => state.characters.totalOfCharacters,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { debounce } = useDebounce(50, false);
  const [open, setOpen] = useState(false);

  const closeDetail = () => {
    setOpen(false);
    dispatch(clearCharacter());
    if (id) navigate('/context');
  };

  useEffect(() => {
    if (character) setOpen(true);

    // eslint-disable-next-line
  }, [character]);

  useEffect(() => {
    debounce(() => {
      if (id) {
        dispatch(getCharacter(Number(id)));
      }
    });

    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container justifyContent='center' flexDirection='column'>
      <CharactersList
        characters={characters}
        onGetCharacters={(params) => dispatch(getCharacters(params))}
        openDetail={(id) => dispatch(getCharacter(id))}
        totalOfCharacters={totalOfCharacters}
      />
      <Loading isLoading={isLoading} />
      {character && (
        <CharacterDetails
          open={open}
          toggle={closeDetail}
          data={character}
        />
      )}
    </Grid>
  );
};
