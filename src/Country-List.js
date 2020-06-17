import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Country from './Country';

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  background: var(--gray);
  justify-content: center;
  padding: 4em 2em;
`;

function CountryList() {
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCountryList(data);
        console.log(data);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);
  return (
    <CountryListStyled>
      {countryList.map(({ flag, population, region, name, capital }) => {
        return (
          <Country
            key={name}
            flag={flag}
            population={population}
            region={region}
            name={name}
            capital={capital}
          />
        );
      })}
    </CountryListStyled>
  );
}

export default CountryList;
