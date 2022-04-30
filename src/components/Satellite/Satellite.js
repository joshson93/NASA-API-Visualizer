import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import globeImg from '../../images/earth-large.jpg';
import axios from 'axios';
import SatelliteTable from '../SatelliteTable/SatelliteTable';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
export default function Satellite() {
  const globeEl = useRef();
  const [rotation, setRotation] = useState(true);
  const [satelliteId, setSatelliteId] = useState('');
  const [altitude, setAltitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searched, setSearched] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [continent, setContinent] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [locality, setLocality] = useState('');
  const [satelliteName, setSatelliteName] = useState('');
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 2;
  }, [rotation]);

  const onChangeSatellite = (e) => {
    setSatelliteId(e.target.value);
  };

  const onClickSatellite = () => {
    const url = `https://tle.ivanstanojevic.me/api/tle/${satelliteId}/propagate`;
    axios.get(url).then((data) => {
      console.log(data.data);
      setAltitude(data.data.geodetic.altitude.toFixed(2));
      setLatitude(data.data.geodetic.latitude.toFixed(4));
      setLongitude(data.data.geodetic.longitude.toFixed(4));
      setSatelliteName(data.data.tle.name);
    });

    const geourl = `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${process.env.REACT_APP_GEOAPI}`;
    axios
      .get(geourl)
      .then((data) => {
        console.log(data.data);
        if (data.error) {
          setErrorMessage(
            'The satellite is located either on a body of water or not near a country!'
          );
          setSearched(true);
          return;
        }
        setContinent(data.data.continent);
        setLocality(data.data.locality);
        setCountryName(data.data.countryName);
      })
      .catch((err) => {
        if (err) {
          setErrorMessage(true);
        }
      });
    setSearched(true);
    setSatelliteId('');
    setErrorMessage(false);
  };

  const objectsData = () => {
    const arr = [];
    const obj = {};
    obj.lat = latitude;
    obj.long = longitude;
    arr.push(obj);
    return arr;
  };

  return (
    <div>
      <Navbar />
      <SatellitePageOpener>
        Below are a list of some of the Satellites that are tracked by CelesTrak! Input the ID into
        the search bar{' '}
      </SatellitePageOpener>
      <SatelliteContainer>
        <SatelliteTable />
      </SatelliteContainer>
      <input
        type='text'
        placeholder='search for satellites here!'
        value={satelliteId}
        onChange={onChangeSatellite}
      />
      <button onClick={onClickSatellite}>Search!</button>
      {locality && locality !== 'Null Island' && continent.length === 0 && (
        <p>
          The satellite {satelliteName} is near {locality}
        </p>
      )}
      {locality.includes('Ocean') && (
        <p>
          The satellite {satelliteName} is near the {locality}
        </p>
      )}
      {locality !== 'Null Island' &&
        !locality.includes('Ocean') &&
        continent.length > 0 &&
        searched && (
          <p>
            The satellite {satelliteName} is currently {altitude} km high and is located on the
            continent {continent} near the country {countryName}!
          </p>
        )}
      {locality === 'Null Island' && (
        <p>
          Cannot find the approximate location of the satellite at the moment. Check back in a few
          as they move quick!
        </p>
      )}
      {errorMessage && (
        <p>
          Cannot find the approximate location of the satellite at the moment. Check back in a few
          as they move quick!
        </p>
      )}
      <Globe
        showAtmosphere={true}
        ref={globeEl}
        globeImageUrl={globeImg}
        objectsData={objectsData()}
        objectLat={latitude}
        objectLng={longitude}
        width={900}
        height={900}
      />
    </div>
  );
}

const SatelliteContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SatellitePageOpener = styled.h3`
  margin-top: 5em;
`;
