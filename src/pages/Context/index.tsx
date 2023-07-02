import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import { CharactersService } from '../../services';
import { ICharacter, IGetAll } from '../../types';
import { CharactersList } from '../../components';

export const ContextPage = () => {
  // const { charId } = useParams();
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [totalOfCharacters, setTotalOfCharacters] = useState(0);

  const getCharacters = (params: IGetAll) => {
    CharactersService.getAll(params).then((result) => {
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
    </Grid>
  );
};
