import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import { CharactersList, Loading } from '../../components';
import { CharactersService } from '../../services';
import { ICharacter, IGetAll } from '../../types';
import { useLoadingContext } from '../../contexts';

export const Page = () => {
  // const { charId } = useParams();
  const { isLoading, setLoading, removeLoading } = useLoadingContext();
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [totalOfCharacters, setTotalOfCharacters] = useState(0);

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

  return (
    <Grid container justifyContent='center' flexDirection='column'>
      <CharactersList
        characters={characters}
        onGetCharacters={getCharacters}
        openDetail={(id) => console.log(id)}
        totalOfCharacters={totalOfCharacters}
      />
      <Loading isLoading={isLoading} />
    </Grid>
  );
};
