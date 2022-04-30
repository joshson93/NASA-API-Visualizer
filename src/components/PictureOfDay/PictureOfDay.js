import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function PictureOfDay() {
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [explanation, setExplanation] = useState('');
  const [date, setDate] = useState('');
  const [copyright, setCopyright] = useState('');
  useEffect(() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APIKEY}`;
    const data = axios.get(url);
    data.then((data) => {
      setImageSrc(data.data.url);
      setTitle(data.data.title);
      setDate(data.data.date);
      setExplanation(data.data.explanation);
      setCopyright(data.data.copyright);
    });
  }, []);

  return (
    <div>
      <h1>NASA's picture of the day!</h1>
      <h3>Title: {title}</h3>
      <img src={imageSrc} />
      <p>{explanation}</p>
      <p>Credit to: {copyright}</p>
    </div>
  );
}
