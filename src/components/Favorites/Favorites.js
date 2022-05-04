import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import styled from 'styled-components';
import parse from 'html-react-parser';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Favorites() {
  const [favorited, setFavorited] = useState([]);

  useEffect(() => {
    console.log('hi');
    axios
      .get('/favorite')
      .then((res) => setFavorited(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deletePickerHandler = (id) => {
    const url = `/favorite/${id}`;
    axios.delete(url).then(() => {
      let getUrl = '/favorite';
      axios.get(getUrl).then((res) => setFavorited(res.data));
    });
  };

  const favoritedList = [...favorited].map((fav) => {
    return (
      <FavoritedContainer key={fav._id}>
        <h1>{fav.title}</h1>
        <img alt='nasa pics' src={fav.image} />
        <IconButton onClick={() => deletePickerHandler(fav._id)}>
          <DeleteIcon sx={{ color: 'red' }} />
        </IconButton>
        <p>{parse(fav.description)}</p>
        {fav.location && <p>{fav.location}</p>}
        {fav.author && <p>{fav.author}</p>}
      </FavoritedContainer>
    );
  });

  return (
    <div>
      <Navbar />
      {favoritedList.length === 0 && <NoFavMessage>There are no pictures saved!</NoFavMessage>}
      {favoritedList && favoritedList}
    </div>
  );
}

const FavoritedContainer = styled.div`
  margin-top: 5em;
`;

const NoFavMessage = styled.p`
  text-align: center;
  margin-top: 7em;
`;
