import { Button, MultiProvider } from '@j-meira/mui-theme';
import { useEffect } from 'react';
import { CharactersService } from './services';

export const App = () => {
  useEffect(() => {
    CharactersService.getAll({}).then((result) => {
      if (result) console.log(result);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <MultiProvider
      adapterLocalePtBR
      snackAnchorOrigin={{ horizontal: 'right', vertical: 'top' }}
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
      <div className='main'>
        <Button>test</Button>
      </div>
    </MultiProvider>
  );
};
