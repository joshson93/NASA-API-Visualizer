import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import globeImg from '../../images/earth-large.jpg';
import axios from 'axios';
import SatelliteTable from '../SatelliteTable/SatelliteTable';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import moment from 'moment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
export default function Satellite() {
  const globeEl = useRef();
  const [rotation, setRotation] = useState(true);
  const [satelliteId, setSatelliteId] = useState('');
  const [altitude, setAltitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  let [longitude, setLongitude] = useState(null);
  const [searched, setSearched] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [continent, setContinent] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [tleError, setTleError] = useState(false);
  const [locality, setLocality] = useState('');
  const [satelliteName, setSatelliteName] = useState('');
  const [velocity, setVelocity] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favCount] = useState(Number(localStorage.getItem('favCounter')) || 0);
  const dateFormatter = moment(date).format('MMMM Do YYYY, h:mm:ss a');
  const mainSuccessMessage =
    !tleError &&
    !errorMessage &&
    locality !== 'Null Island' &&
    !locality.includes('Ocean') &&
    continent.length > 0 &&
    searched;
  const successMessageNoContinent =
    !tleError &&
    !errorMessage &&
    locality &&
    locality !== 'Null Island' &&
    !locality.includes('Ocean') &&
    continent.length === 0;
  const successMessageOcean = !tleError && locality.includes('Ocean') && !errorMessage;
  const errorMessageGeo = !tleError && !errorMessage && locality === 'Null Island';

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 1;
  }, [rotation]);

  const onChangeSatellite = (e) => {
    setSatelliteId(e.target.value);
  };

  const onClickSatellite = () => {
    setLoading(true);
    setTimeout(() => {
      const url = `https://tle.ivanstanojevic.me/api/tle/${satelliteId}/propagate`;
      axios
        .get(url)
        .then((data) => {
          setAltitude(data.data.geodetic.altitude.toFixed(2));
          setLatitude(data.data.geodetic.latitude.toFixed(4));
          setLongitude(data.data.geodetic.longitude.toFixed(4));
          setSatelliteName(data.data.tle.name);
          setDate(data.data.parameters.date);
          setVelocity(data.data.vector.velocity.r.toFixed(3));
        })
        .catch((err) => {
          setTleError(true);
        });

      const geourl = `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${(longitude =
        (((longitude % 360) + 540) % 360) - 180)}&localityLanguage=en&key=${
        process.env.REACT_APP_GEOAPI
      }`;
      axios
        .get(geourl)
        .then((data) => {
          console.log(data.data);
          if (data.error) {
            setErrorMessage(true);
            setSearched(true);
            return;
          }
          setContinent(data.data.continent);
          setLocality(data.data.locality);
          setCountryName(data.data.countryName);
          setLoading(false);
        })
        .catch((err) => {
          if (err) {
            setErrorMessage(true);
          }
        });
      setSearched(true);
      setSatelliteId('');
      setErrorMessage(false);
      setTleError(false);
    }, 500);
  };

  return (
    <EntireSatelliteContainer>
      <Navbar favNum={favCount} />
      <SatellitePageOpener>
        Below is a list of some of the Satellites that are tracked by CelesTrak.
      </SatellitePageOpener>
      <SatelliteContainer>
        <SatelliteTable />
      </SatelliteContainer>
      <h3>Input the Satellite ID below to find out where it is!</h3>
      <TextField
        sx={{ width: '20%' }}
        size='small'
        type='text'
        label='Satellite ID'
        variant='outlined'
        value={satelliteId}
        onChange={onChangeSatellite}
      />
      <Button style={{ height: '40px' }} variant='outlined' onClick={onClickSatellite}>
        {loading ? <CircularProgress size='1rem' color='primary' /> : 'Search!'}
      </Button>
      {successMessageNoContinent && (
        <SatelliteInfo>
          As of {dateFormatter}, the satellite {satelliteName} is near {locality}, {altitude} km
          high, and travelling at {velocity} km/s.
        </SatelliteInfo>
      )}
      {successMessageOcean && (
        <SatelliteInfo>
          As of {dateFormatter}, the satellite {satelliteName} is near the {locality}, {altitude} km
          high, and travelling at {velocity} km/s.
        </SatelliteInfo>
      )}
      {mainSuccessMessage && (
        <SatelliteInfo>
          As of {dateFormatter}, the satellite {satelliteName} is currently {altitude} km high,
          located on the continent {continent} near the country {countryName} and is travelling at{' '}
          {velocity} km/s.
        </SatelliteInfo>
      )}
      {errorMessageGeo && (
        <SatelliteInfo>
          Cannot find the approximate location of the satellite at the moment. Check back in a few
          as they move quickly.
        </SatelliteInfo>
      )}
      {!tleError && errorMessage && (
        <SatelliteInfo>
          Cannot find the approximate location of the satellite at the moment. Check back in a few
          as they move quickly
        </SatelliteInfo>
      )}
      {tleError && !errorMessage && (
        <p>CelesTrak cannot find a satellite with that ID. Please input a valid satellite ID</p>
      )}
      <GlobeMessage>
        Use this globe, using the data above, to visualize the location of the satellite.
      </GlobeMessage>
      <GlobeContainer>
        <Globe
          showAtmosphere={true}
          ref={globeEl}
          globeImageUrl={globeImg}
          width={1000}
          height={900}
        />
      </GlobeContainer>
    </EntireSatelliteContainer>
  );
}

const EntireSatelliteContainer = styled.div`
  margin-left: 10em;
  margin-right: 10em;
`;

const SatelliteContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SatellitePageOpener = styled.h3`
  margin-top: 5em;
  text-align: center;
`;

const GlobeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SatelliteInfo = styled.p`
  margin-top: 2em;
  text-align: center;
`;

const GlobeMessage = styled.h3`
  margin-top: 3em;
  text-align: center;
`;
