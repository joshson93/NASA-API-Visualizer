import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import styled from 'styled-components';
import parse from 'html-react-parser';
import ShowMoreText from 'react-show-more-text';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';
import uuid from 'react-uuid';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Favorites() {
  const [favorited, setFavorited] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

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
    setTimeout(() => {
      axios
        .get('/favorite')
        .then((res) => {
          setFavorited(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  const pageCount = Math.ceil(favorited.length / 4);

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

  const pageClickHandler = (data, pageNumber) => {
    setPage(pageNumber);
  };

  const deletePickerHandler = (id) => {
    const url = `/favorite/${id}`;
    handleClick({ vertical: 'top', horizontal: 'right' })();
    axios.delete(url).then(() => {
      let getUrl = '/favorite';
      axios.get(getUrl).then((res) => setFavorited(res.data));
    });
  };

  const favoritedList = [...favorited].slice((page - 1) * 4, page * 4).map((fav) => {
    return (
      <FavoritedContainer key={fav._id}>
        <h1>{fav.title}</h1>
        <Img alt='nasa pics' src={fav.image} />
        <IconButton onClick={() => deletePickerHandler(fav._id)}>
          <DeleteIcon sx={{ color: 'red' }} />
        </IconButton>
        <TextContainer>
          <ShowMoreTextStyled
            lines={2}
            truncatedEndingComponent={'...'}
            more='show more'
            less='show less'
            width={550}>
            {parse(fav.description)}
          </ShowMoreTextStyled>
        </TextContainer>
        {fav.location && <p>{fav.location}</p>}
        {fav.author && <p>{fav.author}</p>}
      </FavoritedContainer>
    );
  });

  return (
    <div>
      <Navbar />
      <FavoritesHeading>Favorites section</FavoritesHeading>
      {loading && <SkeletonContainer>{skeletonPages}</SkeletonContainer>}
      {favoritedList.length === 0 && !loading && (
        <NoFavMessage>There are no pictures saved!</NoFavMessage>
      )}
      {favoritedList.length > 0 && favoritedList}
      {favoritedList.length > 0 && (
        <PaginationArea>
          <Stack spacing={3}>
            <Pagination count={pageCount} page={page} color='primary' onChange={pageClickHandler} />
          </Stack>
          <div>
            <Snackbar
              open={open}
              anchorOrigin={{ vertical, horizontal }}
              autoHideDuration={1000}
              onClose={handleClose}
              action={action}>
              <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                Deleted!
              </Alert>
            </Snackbar>
          </div>
        </PaginationArea>
      )}
    </div>
  );
}

const FavoritedContainer = styled.div`
  text-align: center;
  margin-top: 5em;
`;

const NoFavMessage = styled.p`
  text-align: center;
  margin-top: 5em;
`;

const TextContainer = styled.div`
  width: 60%;
  left: 0;
  right: 0;
  margin: auto;
`;

const Img = styled.img`
  max-height: 700px;
  max-width: 700px;
  height: auto;
  width: auto;
  object-fit: cover;
`;

const PaginationArea = styled.div`
  display: flex;
  justify-content: center;
`;

const FavoritesHeading = styled.h1`
  margin-top: 3em;
  text-align: center;
`;

const SkeletonContainer = styled.div`
  display: table;
  margin: 0 auto;
`;

const ShowMoreTextStyled = styled(ShowMoreText)`
  a {
    display: block;
  }
`;
