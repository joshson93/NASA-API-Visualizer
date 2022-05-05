import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from 'moment';
export default function PictureOfDay() {
  const [favCount] = useState(Number(localStorage.getItem('favCounter')) || 0);
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [explanation, setExplanation] = useState('');
  const [date, setDate] = useState(moment(new Date().getTime()).format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(true);

  const dateChange = (newVal) => {
    setDate(moment(newVal.getTime()).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    setLoading(true);
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APIKEY}&date=${date}`;
    const data = axios.get(url);
    data.then((data) => {
      setImageSrc(data.data.url);
      setTitle(data.data.title);
      setExplanation(data.data.explanation);
      setLoading(false);
    });
  }, [date]);

  if (loading) {
    return (
      <EntirePicContainer>
        <Navbar favNum={favCount} />
        <DateContainer>
          <h3>Change the date to see NASA's picture of the day</h3>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Date'
              inputFormat='MM/dd/yyyy'
              value={date}
              onChange={dateChange}
              minDate={new Date('01-14-1996')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DateContainer>
        <SkeletonContainer>
          <Skeleton
            animation='wave'
            sx={{ mr: '30%', ml: '40%' }}
            style={{ marginTop: '5em', width: '200px' }}
            variant='h1'
          />
          <Skeleton
            animation='wave'
            style={{ marginTop: '1em', width: '100%' }}
            variant='rectangular'
            width={1000}
            height={400}
          />
          <Skeleton
            animation='wave'
            style={{ marginTop: '1em' }}
            variant='rectangular'
            width={1000}
            height={200}
          />
        </SkeletonContainer>
      </EntirePicContainer>
    );
  } else {
    return (
      <EntirePicContainer>
        <Navbar favNum={favCount} />
        <DateContainer>
          <h3>Change the date to see NASA's picture of the day</h3>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat='MM/dd/yyyy'
              value={date}
              onChange={dateChange}
              renderInput={(params) => <TextField {...params} disabled={true} />}
            />
          </LocalizationProvider>
        </DateContainer>
        <PictureTitle>Title: {title}</PictureTitle>
        <PictureOfDayContainer>
          <img src={imageSrc} />
        </PictureOfDayContainer>
        <Explanation>{explanation}</Explanation>
      </EntirePicContainer>
    );
  }
}

const PictureTitle = styled.h3`
  margin-top: 5em;
  text-align: center;
`;

const PictureOfDayContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Explanation = styled.p`
  text-align: 'center';
`;

const DateContainer = styled.div`
  margin-top: 7em;
`;

const EntirePicContainer = styled.div`
  margin-right: 8em;
  margin-left: 8em;
`;

const SkeletonContainer = styled.div`
  display: table;
  margin: 0 auto;
`;
