import moment from 'moment';
import { Grid, Typography } from '@mui/material';

const date = new Date();

export const AboutPage = () => {
  const getReleaseDate = () => {
    const date = moment(
      process.env.REACT_APP_V_DATE || '2023-07-01T21:00:00',
    );

    return `${date.format('MM/DD/YYYY')} - ${date
      .subtract(3, 'hours')
      .format('hh:mm A')}`;
  };

  return (
    <Grid container className='about-page'>
      <Grid item xs={12}>
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
          {process.env.REACT_APP_VERSION} of {getReleaseDate()}
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
              href='https://xd.adobe.com/view/5192aaaf-a7a0-46e8-8b62-e1afba083a53-04c1/?fullscreen'
              rel='noopener noreferrer'
              target='_blank'
            >
              on XD;
            </a>
          </li>
          <li>
            <a
              href='https://www.behance.net/gallery/174274841/Marvel-Heroes'
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
