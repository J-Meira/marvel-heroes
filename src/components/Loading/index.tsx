import { Box, CircularProgress, Paper } from '@mui/material';

export interface ILoadingProps {
  isLoading: boolean;
}

export const Loading = ({ isLoading }: ILoadingProps) => (
  <>
    <Paper
      square
      sx={{
        display: isLoading ? 'flex' : 'none',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        zIndex: 9998,
        opacity: [0.9, 0.8, 0.7],
      }}
    />
    <Paper
      square
      sx={{
        display: isLoading ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          m: 1,
          position: 'relative',
          borderRadius: '10rem',
          overflow: 'hidden',
          width: '128px',
          height: '128px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src='assets/icon-marvel.svg'
          alt='marvel-logo'
          height='80px'
        />
        <CircularProgress
          size={130}
          color='primary'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </Box>
    </Paper>
  </>
);
