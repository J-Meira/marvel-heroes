import { MultiProvider } from '@j-meira/mui-theme';

export const App = () => (
  <MultiProvider
    adapterLocalePtBR
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
    <div className='main'>Main</div>
  </MultiProvider>
);
