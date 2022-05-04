import React, { useState, useEffect } from 'react';
import SearchPicture from './SearchPicture/SearchPicture';
import axios from 'axios';
import SearchPhotos from './SearchPhotos/SearchPhotos';
import Skeleton from '@mui/material/Skeleton';
import Navbar from './Navbar/Navbar';
import styled from 'styled-components';
import uuid from 'react-uuid';
function App() {
  const [searchPhotos, setSearchPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favCount, setFavCount] = useState(Number(localStorage.getItem('favCounter')) || 0);
  const skeletonPages = [...Array(4)].map((skeleton) => (
    <div key={uuid()}>
      <Skeleton style={{ marginTop: '1em' }} variant='h1' animation='wave' />
      <Skeleton
        style={{ marginTop: '1em' }}
        variant='rectangular'
        animation='wave'
        height={400}
        width={400}
      />
      <Skeleton style={{ marginTop: '1em' }} variant='body1' animation='wave' />
    </div>
  ));

  useEffect(() => {
    localStorage.setItem('favCounter', favCount);
  }, [favCount]);

  const getSearchTermFromNASA = (term) => {
    const url = `https://images-api.nasa.gov/search?q=${term}`;
    axios.get(url).then((data) => {
      console.log(data);
      setSearchPhotos(data.data.collection.items);
      setLoading(false);
    });
  };

  const favCountIncrease = () => {
    setFavCount(favCount + 1);
  };

  const turnOnLoader = () => {
    setLoading(true);
  };
  const mainPageWithLoader = () => {
    return (
      <>
        <Navbar />
        <EntireAppContainer>
          <OpeningMessage>Welcome to the NASA API Visualizer!</OpeningMessage>
          <SearchText>Search for pictures from NASA!</SearchText>
          <SearchPicture search={getSearchTermFromNASA} loading={turnOnLoader} />
          <SkeletonContainer>{skeletonPages}</SkeletonContainer>
        </EntireAppContainer>
      </>
    );
  };

  const mainPageWithoutLoader = () => {
    return (
      <>
        <Navbar favNum={favCount} />
        <EntireAppContainer>
          <OpeningMessage>Welcome to the NASA API Visualizer!</OpeningMessage>
          <SearchText>Search for pictures from NASA!</SearchText>
          <SearchPicture search={getSearchTermFromNASA} loading={turnOnLoader} />
          <SearchPhotos favCount={favCountIncrease} photos={searchPhotos} />
        </EntireAppContainer>
      </>
    );
  };

  if (loading) {
    return mainPageWithLoader();
  } else {
    return mainPageWithoutLoader();
  }
}

export default App;

const OpeningMessage = styled.h1`
  margin-top: 3em;
`;

const SearchText = styled.h3``;

const EntireAppContainer = styled.div`
  margin-top: 7em;
  text-align: center;
`;

const SkeletonContainer = styled.div`
  display: table;
  margin: 0 auto;
`;
