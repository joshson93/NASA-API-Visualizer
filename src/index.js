import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './components/App';
// import Satellite from './components/Satellite/Satellite';
// import PictureOfDay from './components/PictureOfDay/PictureOfDay';
// import Favorites from './components/Favorites/Favorites';
const App = lazy(() => import('./components/App'));
const Satellite = lazy(() => import('./components/Satellite/Satellite'));
const PictureOfDay = lazy(() => import('./components/PictureOfDay/PictureOfDay'));
const Favorites = lazy(() => import('./components/Favorites/Favorites'));

const ProgressContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Suspense
      fallback={
        <ProgressContainer>
          <CircularProgress color='primary' />
        </ProgressContainer>
      }>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='APOD' element={<PictureOfDay />} />
        <Route path='satellites' element={<Satellite />} />
        <Route path='saved' element={<Favorites />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
