const fetchCountries = () => {
  return fetch('/utils/data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Unable to fetch data');
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      return [{name:'js', id:'test'}];
    });
};

export default fetchCountries;