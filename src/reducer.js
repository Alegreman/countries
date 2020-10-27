export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_COUNTRY_LIST': {
      return { ...state, countryList: action.payload };
    }

    case 'SET_COUNTRY_BY_NAME': {
      let list;
      if (state.filterByRegion !== '') {
        list = state.countryFilteredByRegion;
      } else {
        list = state.countryList;
      }
      console.log(action.payload)
      const countryListByName = list.filter(country =>
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      console.log(state)
      return { ...state, countryListByName };
    }

    case 'FILTER_BY_REGION': {
      const { regionSelected } = action.payload;

      if ('' === regionSelected) {
        return { ...state, countryFilteredByRegion: [], filterByRegion: '' };
      }

      const countryFilteredByRegion = state.countryList.filter(
        country => country.region === regionSelected
      );

      return {
        ...state,
        countryFilteredByRegion,
        filterByRegion: regionSelected,
      };
    }

    default: {
      return state;
    }
  }
}
