import { Route, Routes } from 'react-router-dom';
import { ContextPage, HomePage, NotFoundPage, ReduxPage } from '../pages';

export const AppRoutes = () => (
  <Routes>
    <Route path='/context' element={<ContextPage />} />
    <Route path='/context/:charId' element={<ContextPage />} />
    <Route path='/redux' element={<ReduxPage />} />
    <Route path='/redux/:charId' element={<ReduxPage />} />
    <Route path='/' element={<HomePage />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);
