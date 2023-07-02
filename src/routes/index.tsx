import { Route, Routes } from 'react-router-dom';

import {
  AboutPage,
  ContextPage,
  HomePage,
  NotFoundPage,
  ReduxPage,
} from '../pages';

export const AppRoutes = () => (
  <Routes>
    <Route path='/about' element={<AboutPage />} />
    <Route path='/context' element={<ContextPage />} />
    <Route path='/context/:id' element={<ContextPage />} />
    <Route path='/redux' element={<ReduxPage />} />
    <Route path='/redux/:id' element={<ReduxPage />} />
    <Route path='/' element={<HomePage />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);
