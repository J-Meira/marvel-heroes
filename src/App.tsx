import { useState } from 'react';
import { Grid } from '@mui/material';
import { Button, MultiProvider } from '@j-meira/mui-theme';

import { CharactersService } from './services';
import { IGetAll } from './services/Characters';

export const App = () => {
  const [img, setImg] = useState<string[]>([]);
  const [params, setParams] = useState<IGetAll>({
    limit: 100,
    offset: 0,
    orderBy: 'name',
    nameStartsWith: undefined,
  });

  const getCharacters = () => {
    CharactersService.getAll(params).then((result) => {
      if (result) {
        setImg(
          result.data.results.map((r) => {
            const { path, extension } = r.thumbnail;
            return `${path}/standard_medium.${extension}`.replace(
              'http:',
              'https:',
            );
          }),
        );
        setParams({
          ...params,
          offset: params.offset + params.limit,
        });
      }
    });
  };

  return (
    <MultiProvider
      adapterLocalePtBR
      snackAnchorHorizontal='right'
      snackAnchorVertical='top'
      snackAutoHideDuration={5000}
      snackMax={3}
      palette={{
        primary: {
          light: '#6fddff',
          main: '#29abe2',
          dark: '#007cb0',
          contrastText: '#fff',
        },
        secondary: {
          light: '#74706f',
          main: '#494544',
          dark: '#221e1d',
          contrastText: '#fff',
        },
      }}
    >
      <Grid container className='main-expanded'>
        <Grid item xs={12}>
          <Button onClick={getCharacters}>Get List</Button>
        </Grid>
        <Grid item xs={12}>
          {img && img.map((i, f) => <img key={f} src={i} alt='thumb' />)}
        </Grid>
      </Grid>
    </MultiProvider>
  );
};
