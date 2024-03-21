import React, {
  useState,
  useEffect,
  createContext,
  // useMemo,
  // useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import Snackbar from 'react-native-snackbar';
// import {io} from 'socket.io-client';
// import {useIsFocused} from '@react-navigation/native';
// import {BASEURL} from '@env';
import {useSelector} from 'react-redux';

// import {} from ""
// import {Alert} from 'react-native';

const AuthContext = createContext();

const AuthProivder = ({children}) => {
  // const BASEURL = null;
  // const [BASEURL, setBaseUrl] = useState(null);
  const BASEURL = useSelector(state => state.baseUrl);
  const apiUrl = BASEURL;
  const snackbarOptions = {
    textColor: 'green',
    numberOfLines: 1,
    backgroundColor: '#fff',
  };

  const [Token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [schedule, setSchedule] = useState('');
  const [subdate, setSubdate] = useState('');

  const getToken = () => {
    AsyncStorage.getItem('userToken').then(value => {
      if (value !== null) {
        setToken(value);
      }
    });
  };

  const handleToast = (message, type) => {
    setType(type);
    setMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          // BASEURL,
          // setBaseUrl,
          Token,
          schedule,
          setSchedule,
          subdate,
          setSubdate,
          isFirstLaunch,
          apiUrl,
          setToken,
          userDetails,
          setUserDetails,
          coupon,
          setCoupon,
          handleToast,
          showToast,
          message,
          type,
          isLoading,
          setIsLoading,
          // no longer used
          // SignUp: (houseNumber, locality, landmark) => {
          //   axios
          //     .post(
          //       `${apiUrl}/signup`,
          //       JSON.stringify({
          //         name: houseNumber,
          //         email: locality,
          //         password: landmark,
          //       }),
          //       {
          //         headers: {
          //           'Content-Type': 'application/json',
          //         },
          //       },
          //     )
          //     .then(response => {
          //       console.log(response?.data?.token, 'LoginAuth');
          //       if (response?.status === 200) {
          //         AsyncStorage.setItem('userToken', response?.data?.token);
          //         setToken(response?.data?.token);
          //         Snackbar.show({
          //           text: `${response?.data?.message}`,
          //           ...snackbarOptions,
          //         });
          //       }
          //     })
          //     .catch(error => {
          //       // Handle error
          //     });
          // },

          SignIn: (locality, landmark) => {
            axios
              .post(
                `${apiUrl}/login`,
                JSON.stringify({
                  email: locality,
                  password: landmark,
                }),
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then(response => {
                const responseBody = response.data?.data;
                console.log(response.data);
                if (responseBody?.status) {
                  AsyncStorage.setItem('userToken', response?.data?.token);
                  setToken(response?.data?.token);
                  Snackbar.show({
                    text: `${response?.data?.message}`,
                    ...snackbarOptions,
                  });
                }
              })
              .catch(error => {
                // Handle error
                console.log('Error occurred: ');
                console.log(error);
              });
          },

          logout: () => {
            try {
              AsyncStorage.removeItem('userToken');

              setToken(null);
              setIsFirstLaunch(null);
            } catch (error) {
              console.log(error);
            }
          },
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export {AuthProivder, AuthContext};
