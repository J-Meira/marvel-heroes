import { Provider } from 'react-redux';
import { store } from '../../redux';
import { Page } from './Page';

export const ReduxPage = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);
