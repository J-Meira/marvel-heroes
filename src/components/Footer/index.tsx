import { Typography } from '@mui/material';
import { useMultiContext } from '@j-meira/mui-theme';

const date = new Date();

export const Footer = () => {
  const { dark } = useMultiContext();

  return (
    <footer className={`bar${dark ? '-dark' : ''}`}>
      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
        {'Developer by '}
        <a
          href='https://github.com/J-Meira'
          rel='noopener noreferrer'
          target='_blank'
        >
          J-Meira
        </a>
        {' with data provided by '}
        <a
          href='https://marvel.com'
          rel='noopener noreferrer'
          target='_blank'
        >
          © {date.getFullYear()} MARVEL
        </a>
      </Typography>
    </footer>
  );
};
