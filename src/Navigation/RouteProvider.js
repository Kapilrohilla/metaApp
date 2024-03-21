import React, {useEffect} from 'react';
import {AuthProivder} from './AuthProvider';
import Provider from './Provider';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateBaseUrl} from '../../ReduxToolkit/slices/baseUrl';

const RouteProvider = () => {
  const baseUrl = useSelector(state => state.baseUrl);
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem('baseUrl')
      .then(r => {
        if (r) {
          if (baseUrl === r) {
            // console.log('same url');
            return;
          } else {
            // console.log('not same url');
            dispatch(updateBaseUrl(r));
          }
        } else {
          // console.log('not found');
        }
      })
      .catch(err => {
        console.log(console.error(err));
      });
  }, []);
  return (
    <AuthProivder>
      <Provider />
    </AuthProivder>
  );
};
export default RouteProvider;
