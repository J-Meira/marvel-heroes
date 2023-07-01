import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContextPage, HomePage, NoutFoundPage, ReduxPage } from '../pages';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/context' element={<ContextPage />} />
      <Route path='/context/:charId' element={<ContextPage />} />
      <Route path='/redux' element={<ReduxPage />} />
      <Route path='/redux/:charId' element={<ReduxPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<NoutFoundPage />} />
    </Routes>
  </BrowserRouter>
);
