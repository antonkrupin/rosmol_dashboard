import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import MainPage from './pages/MainPage';
import Auth from './pages/Auth';
import Page404 from './pages/Page404';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
