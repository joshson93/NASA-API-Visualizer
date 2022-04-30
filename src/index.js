import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PictureOfDay from './components/PictureOfDay/PictureOfDay';
import SearchPhotos from './components/SearchPhotos/SearchPhotos';
import Satellite from './components/Satellite/Satellite';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/APOD' element={<PictureOfDay />} />
      <Route path='/satellites' element={<Satellite />} />
    </Routes>
  </BrowserRouter>
);
