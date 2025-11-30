import dayjs from 'dayjs';
import { Grid, Typography } from '@mui/material';

const date = new Date();

export const AboutPage = () => {
  const getReleaseDate = () => {
    const date = dayjs(
      import.meta.env.VITE_V_DATE || '2023-07-01T21:00:00',
    );
    return `${date.format('MM/DD/YYYY')} - ${date.format(
      'hh:mm A',
    )} (UTC)`;
  };

  return (
    <Grid container className='about-page'>
      <Grid size={12}>
        <Typography variant='h2' className='page-title'>
          Marvel Heroes List in{' '}
          <a
            href='https://react.dev'
            rel='noopener noreferrer'
            target='_blank'
          >
            React
          </a>
        </Typography>
        <Typography variant='h4' className='app-version'>
          {import.meta.env.VITE_VERSION} of {getReleaseDate()}
        </Typography>
        <Typography variant='body1' className='description'>
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
        <Typography variant='body1' className='description'>
          <b>Using:</b>
        </Typography>
        <ul>
          <li>
            <a
              href='https://mui-theme.jm.app.br'
              rel='noopener noreferrer'
              target='_blank'
            >
              Mui Theme;
            </a>
          </li>
          <li>
            <a
              href='https://react.dev/reference/react/useContext'
              rel='noopener noreferrer'
              target='_blank'
            >
              React Context;
            </a>
          </li>
          <li>
            <a
              href='https://redux.js.org'
              rel='noopener noreferrer'
              target='_blank'
            >
              Redux;
            </a>
          </li>
        </ul>
        <Typography variant='body1' className='description'>
          <b>Prototype:</b>
        </Typography>
        <ul>
          <li>
            <a
              href='https://xd.adobe.com/view/e3ae5e7f-d919-4ce6-b68e-b8a6e2f65aff-b6fd/?fullscreen'
              rel='noopener noreferrer'
              target='_blank'
            >
              on XD;
            </a>
          </li>
          <li>
            <a
              href='https://www.behance.net/gallery/217178049/M-Heroes'
              rel='noopener noreferrer'
              target='_blank'
            >
              on Behance;
            </a>
          </li>
        </ul>
        <Typography variant='body1' className='description'>
          <b>Repository:</b>
        </Typography>
        <ul>
          <li>
            <a
              href='https://github.com/J-Meira/marvel-heroes'
              rel='noopener noreferrer'
              target='_blank'
            >
              GitHub;
            </a>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};
