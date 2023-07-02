import { LoadingProvider } from '../../contexts';
import { Page } from './Page';

export const ContextPage = () => (
  <LoadingProvider>
    <Page />
  </LoadingProvider>
);
