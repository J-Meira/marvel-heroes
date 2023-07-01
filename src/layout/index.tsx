import { Paper } from '@mui/material';
import { useMultiContext } from '@j-meira/mui-theme';
import { AppRoutes } from '../routes';

export const Layout = () => {
  const { backgroundColor } = useMultiContext();
  return (
    <>
      <Paper
        sx={{
          backgroundColor: backgroundColor,
          width: '100%',
          height: '100%',
          padding: '5rem 64px 2rem 64px',
        }}
        square
        elevation={0}
      >
        <AppRoutes />
      </Paper>
    </>
  );
};
