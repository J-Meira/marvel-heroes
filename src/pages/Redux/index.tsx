import { Provider } from 'react-redux';

import { Page } from './Page';

import { store } from '../../redux';

export const ReduxPage = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);
