import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { Button } from '@j-meira/mui-theme';

import { ReactComponent as LogoContext } from '../../assets/logo-context.svg';
import { ReactComponent as LogoRedux } from '../../assets/logo-redux.svg';
import { CharactersService } from '../../services';
import { IGetAll } from '../../types';
import { useState } from 'react';

export const HomePage = () => {
  const navigate = useNavigate();
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
    <Grid container className='main-full' sx={{ paddingTop: '10rem' }}>
      <Button
        size='large'
        onClick={() => navigate('/context')}
        fullWidth={false}
      >
        <LogoContext />
        <Typography variant='caption'>With Context</Typography>
      </Button>
      <Button
        size='large'
        onClick={() => navigate('/redux')}
        fullWidth={false}
      >
        <LogoRedux />
        <Typography variant='caption'>With Redux</Typography>
      </Button>

      <Grid item xs={12}>
        <Button onClick={getCharacters}>Get List</Button>
      </Grid>
      <Grid item xs={12}>
        {img && img.map((i, f) => <img key={f} src={i} alt='thumb' />)}
      </Grid>
    </Grid>
  );
};
