import { useNavigate } from 'react-router-dom';

import { Grid2, Typography } from '@mui/material';
import { Button } from '@j-meira/mui-theme';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Grid2 container className='not-found-page'>
      <Typography variant='h2'>404</Typography>
      <Typography variant='h3'>Not Found!</Typography>
      <Button size='large' onClick={() => navigate('/')} fullWidth={false}>
        Black to home
      </Button>
    </Grid2>
  );
};
