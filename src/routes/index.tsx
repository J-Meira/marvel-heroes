import { Route, Routes, useLocation } from 'react-router-dom';

import { Paper } from '@mui/material';
import { useMultiContext } from '@j-meira/mui-theme';

import {
  AboutPage,
  ContextPage,
  HomePage,
  InfiniteScrollPage,
  NotFoundPage,
  ReduxPage,
} from '../pages';

export const AppRoutes = () => {
  const { dark } = useMultiContext();
  const location = useLocation();

  const getClassName = () =>
    `main-container${
      location.pathname.indexOf('infinite-scroll') > 0 ? ' infinite' : ''
    } ${dark ? 'main-container-dark' : ''}`;

  return (
    <Paper className={getClassName()} square elevation={0}>
      <Routes>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/context' element={<ContextPage />} />
        <Route path='/context/:id' element={<ContextPage />} />
        <Route path='/redux' element={<ReduxPage />} />
        <Route path='/redux/:id' element={<ReduxPage />} />
        <Route path='/infinite-scroll' element={<InfiniteScrollPage />} />
        <Route
          path='/infinite-scroll/:id'
          element={<InfiniteScrollPage />}
        />
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Paper>
  );
};
