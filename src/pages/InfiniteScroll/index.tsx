import { LoadingProvider } from '../../contexts';
import { Page } from './Page';

export const InfiniteScrollPage = () => (
  <LoadingProvider>
    <Page />
  </LoadingProvider>
);
