import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
export default function SearchPhotos({ photos }) {
  const [increment, setIncrement] = useState(0);
  const [page, setPage] = useState(1);
  const pageCount = photos.length / 4;
  useEffect(() => {
    setIncrement(0);
    setPage(1);
  }, [photos]);

  const photosList = photos.slice(0 + increment, 4 + increment).map((photo) => {
    return (
      <div key={photo.data[0].nasa_id}>
        {photo.links && <h1>Title: {photo.data[0].title}</h1>}
        {photo.links && <img src={photo.links[0].href} />}
        {photo.data[0].location && <p>Location: {photo.data[0].location}</p>}
        {photo.data[0].photographer || photo.data[0].secondary_creator ? (
          <p>Taken by: {photo.data[0].photographer || photo.data[0].secondary_creator}</p>
        ) : null}
      </div>
    );
  });
  const clickHandle = (data, value) => {
    if (page < value) {
      setIncrement(increment + 4);
      setPage(page + 1);
    } else {
      setIncrement(increment - 4);
      setPage(page - 1);
    }
  };
  return (
    <>
      <div>{photosList}</div>
      <PaginationArea>
        {photosList.length > 0 && (
          <Stack spacing={1}>
            <Pagination count={pageCount} page={page} color='primary' onChange={clickHandle} />
          </Stack>
        )}
      </PaginationArea>
    </>
  );
}

const PaginationArea = styled.div`
  display: flex;
  justify-content: center;
`;
