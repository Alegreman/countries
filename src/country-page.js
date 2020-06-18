import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from './wrapper';
import CountrySelected from './country-selected';
import { useSelector } from 'react-redux';

const CountryPageStyled = styled.div`
.back {
  background: var(--white);
  box-shadow: 0 0 5px rgba(0,0,0,.3);
  padding: .7em 2.2em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 1em;
  color: var(--black);
  i {
    margin-right: 5px;
  }
}
@media screen and (min-width: 1024px) {
  .back {
    margin-top: 3em;
  }
}
`;

function CountryPage({ match, history }) {

  const DBcountry = useSelector(state =>
    state.countryList.find(
      item => item.alpha2Code === match.params.id.replace('-', ' ')
    )
  );
  const [country, setCountry] = useState(DBcountry);

  useEffect(() => {
    if (!country) {
      fetch(`https://restcountries.eu/rest/v2/name/${match.params.id}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setCountry(data[0]);
        });
    }
  }, []);
  function handleClick() {
    history.goBack();
  }
  console.log(country);
  return (
    <CountryPageStyled>
      <Wrapper>
        <button className='back' onClick={handleClick}>
          <i className='fas fa-arrow-left'></i>
          Back
        </button>
        <CountrySelected {...country}></CountrySelected>
      </Wrapper>
    </CountryPageStyled>
  );
}

export default CountryPage;
