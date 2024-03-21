import React, {useEffect, useContext} from 'react';
import AppStack from './AppStack';
// import {BASEURL1} from '@env';
// import {AuthContext} from './AuthProvider';
const Provider = () => {
  // const {BASEURL, setBaseUrl} = useContext(AuthContext);

  // const apiUrl = BASEURL1 + '/abc';
  // fetch(apiUrl)
  //   .then(r => r.json())
  //   .then(data => {
  //     console.log(data);
  //     setBaseUrl(data?.pip_feeder);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  return <AppStack />;
};
export default Provider;
