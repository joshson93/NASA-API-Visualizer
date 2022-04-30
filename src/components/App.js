import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PictureOfDay from './PictureOfDay/PictureOfDay';
import SearchPicture from './SearchPicture/SearchPicture';
import axios from 'axios';
import SearchPhotos from './SearchPhotos/SearchPhotos';
import Navbar from './Navbar/Navbar';
function App() {
  const [searchPhotos, setSearchPhotos] = useState([]);
  const getSearchTermFromNASA = (term) => {
    const url = `https://images-api.nasa.gov/search?q=${term}`;
    axios.get(url).then((data) => {
      console.log(data);
      setSearchPhotos(data.data.collection.items);
    });
  };

  return (
    <div className='App'>
      <Navbar />
      <h1>Welcome to my NASA fan page!</h1>
      <Link to='/APOD'>NASA's picture of the day!</Link>
      <Link to='/satellites'>Satellite location approximation</Link>
      <SearchPicture search={getSearchTermFromNASA} />
      <SearchPhotos photos={searchPhotos} />
    </div>
  );
}

export default App;
