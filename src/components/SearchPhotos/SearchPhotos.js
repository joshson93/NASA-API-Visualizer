import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import parse from 'html-react-parser';
import ShowMoreText from 'react-show-more-text';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
export default function SearchPhotos({ photos, favCount }) {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const pageCount = Math.ceil(photos.length / 4);

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const action = (
    <React.Fragment>
      <IconButton size='small' aria-label='close' color='success' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    setPage(1);
  }, [photos]);

  const saveClickHandler = (photoInfo) => {
    const info = { ...photoInfo };
    const url = '/favorite';
    axios
      .post(url, info)
      .then(() => {
        favCount();
        handleClick({ vertical: 'top', horizontal: 'right' })();
      })
      .catch((err) => {
        if (err.response.data === 'cannot save multiple photos') {
          setError(true);
          handleClick({ vertical: 'top', horizontal: 'right' })();
        }
      });
    setError(false);
  };

  const pageClickHandler = (data, pageNumber) => {
    setPage(pageNumber);
  };

  const photosList = photos.slice((page - 1) * 4, page * 4).map((photo) => {
    return (
      <PictureDescriptionContainer key={photo.data[0].nasa_id}>
        {photo.links && <h1>Title: {photo.data[0].title}</h1>}
        {photo.links && (
          <>
            <Img src={photo.links[0].href} />
            <IconButton onClick={() => saveClickHandler(photo)}>
              <AddCircleIcon size='medium' color='primary' />
            </IconButton>
          </>
        )}
        <TextContainer>
          {photo.data[0].description && (
            <ShowMoreTextStyled
              lines={2}
              truncatedEndingComponent={'...'}
              more='show more'
              less='show less'
              width={550}>
              {parse(photo.data[0].description)}
            </ShowMoreTextStyled>
          )}
        </TextContainer>
        {photo.data[0].location && <p>Location: {photo.data[0].location}</p>}
        {photo.data[0].photographer || photo.data[0].secondary_creator ? (
          <p>Taken by: {photo.data[0].photographer || photo.data[0].secondary_creator}</p>
        ) : null}
      </PictureDescriptionContainer>
    );
  });

  return (
    <>
      <div>{photosList}</div>
      <PaginationArea>
        {photosList.length > 0 && (
          <Stack spacing={3}>
            <Pagination count={pageCount} page={page} color='primary' onChange={pageClickHandler} />
          </Stack>
        )}
        <div>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={1000}
            onClose={handleClose}
            action={action}>
            <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
              Saved successfully!
            </Alert>
          </Snackbar>
        </div>
        {error && (
          <div>
            <Snackbar
              open={open}
              anchorOrigin={{ vertical, horizontal }}
              autoHideDuration={1000}
              onClose={handleClose}
              action={action}>
              <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                Photo already saved!
              </Alert>
            </Snackbar>
          </div>
        )}
      </PaginationArea>
    </>
  );
}

const PaginationArea = styled.div`
  display: flex;
  justify-content: center;
`;

const PictureDescriptionContainer = styled.div``;

const Img = styled.img`
  max-height: 700px;
  max-width: 700px;
  height: auto;
  width: auto;
  object-fit: cover;
`;

const TextContainer = styled.div`
  width: 60%;
  left: 0;
  right: 0;
  margin: auto;
`;

const ShowMoreTextStyled = styled(ShowMoreText)`
  a {
    display: block;
  }
`;
