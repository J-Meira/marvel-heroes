import { Typography } from '@mui/material';

const date = new Date();

export const Footer = () => (
  <footer>
    <Typography variant='caption'>
      Developer by
      <a
        href='https://github.com/J-Meira'
        rel='noopener noreferrer'
        target='_blank'
      >
        {' '}
        J-Meira{' '}
      </a>
      - Data provided by Marvel.
      <a
        href='https://marvel.com'
        rel='noopener noreferrer'
        target='_blank'
      >
        {' '}
        © {date.getFullYear()} MARVEL
      </a>
    </Typography>
  </footer>
);
