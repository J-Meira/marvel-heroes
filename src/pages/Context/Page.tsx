import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import { useDebounce } from '@j-meira/mui-theme';

import {
  CharacterDetails,
  CharactersList,
  Loading,
} from '../../components';

import { useLoadingContext } from '../../contexts';
import { CharactersService } from '../../services';
import { ICharacter, IGetAll } from '../../types';

export const Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { debounce } = useDebounce(50, false);
  const { isLoading, setLoading, removeLoading } = useLoadingContext();
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [totalOfCharacters, setTotalOfCharacters] = useState(0);
  const [character, setCharacter] = useState<ICharacter | undefined>(
    undefined,
  );
  const [open, setOpen] = useState(false);

  const getCharacters = (params: IGetAll) => {
    setLoading();
    CharactersService.getAll(params).then((result) => {
      removeLoading();
      if (result) {
        setCharacters(result.data.results);
        setTotalOfCharacters(result.data.total);
      }
    });
  };

  const openDetail = (paramId: number) => {
    setLoading();
    CharactersService.getById(paramId).then((result) => {
      removeLoading();
      if (result && result.data.results[0]) {
        setCharacter(result.data.results[0]);
      }
    });
  };

  const closeDetail = () => {
    setOpen(false);
    setCharacter(undefined);
    if (id) navigate('/context');
  };

  useEffect(() => {
    if (character) setOpen(true);

    // eslint-disable-next-line
  }, [character]);

  useEffect(() => {
    debounce(() => {
      if (id) {
        openDetail(Number(id));
      }
    });

    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid2 container justifyContent='center' flexDirection='column'>
      <CharactersList
        characters={characters}
        onGetCharacters={getCharacters}
        openDetail={(id) => openDetail(id)}
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
    </Grid2>
  );
};
