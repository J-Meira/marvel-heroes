import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@j-meira/mui-theme';

export const NoutFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Button size='large' onClick={() => navigate('/')} fullWidth={false}>
        Black to home
      </Button>
    </Grid>
  );
};
