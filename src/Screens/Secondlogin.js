import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  SafeAreaView,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {Button, Dialog, Portal} from 'react-native-paper';
import axios from 'react-native-axios';
import {moderateScale, scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Navigation/AuthProvider';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSelector} from 'react-redux';
// import {BASEURL} from '@env';

const Secondlogin = () => {
  // const BASEURL = useSelector(state => state?.baseUrl);
  const BASEURL = 'http://35.154.68.218:8080';
  const {SignIn, Signup} = useContext(AuthContext);
  const navigation = useNavigation();
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(null);
  const {setToken, Token} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 15, backgroundColor: '#1a1a1a'}}>
      <TouchableOpacity
        style={{position: 'absolute', top: 15, left: 15, zIndex: 1000}}
        onPress={() => navigation.goBack()}></TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: '#fff',
            fontFamily: 'AvenirMedium',
            fontWeight: '800',
          }}>
          Sign In
        </Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Text
          style={{
            fontSize: moderateScale(14),
            fontFamily: 'AvenirBlack',
            color: '#fff',
            marginTop: scale(5),
          }}>
          Account Id
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            setLocality(e);
          }}
          value={locality}
          placeholder="Enter Your Account Id"
          keyboardType="default"
          placeholderTextColor={'#C4C4C4'}
        />
        <Text
          style={{
            fontSize: moderateScale(14),
            fontFamily: 'AvenirBlack',
            color: '#fff',
            marginTop: scale(5),
          }}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            setLandmark(e);
          }}
          value={landmark}
          placeholder="Enter your password"
          keyboardType="default"
          placeholderTextColor={'#C4C4C4'}
        />
        {locality?.length > 0 && landmark?.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              const apiUrl = BASEURL;
              const snackbarOptions = {
                textColor: 'green',
                numberOfLines: 1,
                backgroundColor: '#fff',
              };
              axios
                .post(
                  `${apiUrl}/login`,
                  JSON.stringify({
                    email: locality,
                    password: landmark,
                  }),
                  {headers: {'Content-Type': 'application/json'}},
                )
                .then(response => {
                  console.log(response?.data, '/SignIn');
                  if (response?.data?.status) {
                    AsyncStorage.setItem('userToken', response?.data?.token);
                    setToken(response?.data?.token);
                    Snackbar.show({
                      text: `${response?.data?.message}`,
                      ...snackbarOptions,
                    });
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Drawer'}],
                    });
                  } else {
                    const snackbarOptions = {
                      textColor: 'red',
                      numberOfLines: 1,
                      backgroundColor: '#fff',
                    };
                    Snackbar.show({
                      text: `${response?.data?.message}`,
                      ...snackbarOptions,
                    });
                  }
                })
                .catch(error => {
                  console.log('Error occurred: ');
                  console.log(error);
                });
            }}
            style={styles.button}>
            <Text style={styles.buttonTxt1}>Sign In</Text>
          </TouchableOpacity>
        ) : (
          <View style={{...styles.button, opacity: 0.6}}>
            <Text style={styles.buttonTxt1}>Sign In</Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'space-between',
          gap: 10,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            const requestOptions = {
              method: 'POST',
              redirect: 'follow',
            };
            setLoading(true);
            const apiUrl = `${BASEURL}/signup`;
            fetch(apiUrl, requestOptions)
              .then(r => r.json())
              .then(result => {
                const snackbarOptions = {
                  textColor: 'green',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                };
                setLoading(false);
                setIsSignupModalVisible(result?.user);
                AsyncStorage.setItem('userToken', result?.token).then(r => {
                  setToken(result?.token);
                  console.warn(result?.token);
                  Snackbar.show({
                    text: `${result?.message}`,
                    ...snackbarOptions,
                  });
                });
                AsyncStorage.setItem(
                  'user1',
                  JSON.stringify({
                    userId: result?.user?.userId,
                    password: result?.user?.password,
                  }),
                )
                  .then(r => {
                    console.log('user1: saved');
                  })
                  .catch(err => {
                    console.log('user1: failed saving');
                    console.log(err?.message());
                  });
                AsyncStorage.setItem(
                  'loggedIn',
                  JSON.stringify({
                    userId: result?.user?.userId,
                    password: result?.user?.password,
                  }),
                )
                  .then(r => {
                    console.log('loggedIn: saved');
                  })
                  .catch(err => {
                    console.log('LoggedIn: failed saving');
                    console.log(err?.message());
                  });
              })
              .catch(err => {
                setLoading(false);
                console.log('error');
                console.log(err);
              });
            // .then(result => {
            //   console.log(result);
            //   // /*
            //   const snackbarOptions = {
            //     textColor: 'green',
            //     numberOfLines: 1,
            //     backgroundColor: '#fff',
            //   };
            //   setLoading(false);
            //   setIsSignupModalVisible(result?.user);
            //   // console.log(result);
            //   AsyncStorage.setItem('userToken', result?.token).then(r => {
            //     setToken(result?.token);
            //     console.warn(result?.token);
            //     Snackbar.show({
            //       text: `${result?.message}`,
            //       ...snackbarOptions,
            //     });
            //   });
            //   AsyncStorage.setItem(
            //     'user1',
            //     JSON.stringify({
            //       userId: result?.user?.userId,
            //       password: result?.user?.password,
            //     }),
            //   )
            //     .then(r => {
            //       console.log('user1: saved');
            //     })
            //     .catch(err => {
            //       console.log('user1: failed saving');
            //       console.log(err?.message());
            //     });
            //   AsyncStorage.setItem(
            //     'loggedIn',
            //     JSON.stringify({
            //       userId: result?.user?.userId,
            //       password: result?.user?.password,
            //     }),
            //   )
            //     .then(r => {
            //       console.log('loggedIn: saved');
            //     })
            //     .catch(err => {
            //       console.log('LoggedIn: failed saving');
            //       console.log(err?.message());
            //     });
            //   // */
            // })
            // .catch(err => {
            //   setLoading(false);
            //   console.log(err);
            // });
          }}
          style={styles.button}>
          {loading ? (
            <ActivityIndicator color={'#fff'} size={25} />
          ) : (
            <Text style={styles.buttonTxt1}>Open Demo Account</Text>
          )}
        </TouchableOpacity>
      </View>

      <SignupModal
        visible={isSignupModalVisible}
        // visible={true}
        hideDialog={() => setIsSignupModalVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const SignupModal = ({visible, hideDialog, navigation}) => {
  const userId = visible?.userId;
  const balance = visible?.balance;
  const password = visible?.password;
  const investorPassword = visible?.investorPassword;
  const [loading, setLoading] = useState(false);
  const handleAction = () => {
    hideDialog();
    navigation.reset({
      index: 0,
      routes: [{name: 'Drawer'}],
    });
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={{marginBottom: 20, fontSize: 20}}>Demo account credentials.</Dialog.Title>
        <Dialog.Content>
          {/* <Text variant="bodyMedium">This is simple dialog</Text> */}
          <View style={{gap: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Username:</Text>
              <Text
                onPress={() => {
                  Clipboard.setString(userId);
                  ToastAndroid.show('username copied to clipborard', 200);
                }}>
                {userId}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Password:</Text>
              <Text
                onPress={() => {
                  ToastAndroid.show('Password copied to clipboard', 200);
                  Clipboard.setString(password);
                }}>
                {password}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Investor password:</Text>
              <Text
                onPress={() => {
                  ToastAndroid.show('Password copied to clipboard', 200);
                  Clipboard.setString(password);
                }}>
                {/* {password} */}
                {investorPassword}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Balance:</Text>
              <Text>{balance}</Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions></Dialog.Actions>
        <Dialog.Actions>
          <Button
            onPress={() => {
              Clipboard.setStrings[(userId, password)];
              Snackbar.show({
                text: 'Copied',
                textColor: 'green',
                numberOfLines: 1,
                backgroundColor: '#fff',
                duration: 200,
              });
            }}>
            <Text>Copy to Clipboard</Text>
          </Button>
          <Button onPress={handleAction}>Proceed to Login</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Secondlogin;

const styles = StyleSheet.create({
  input: {
    height: scale(50),
    padding: scale(10),
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: scale(30),
    marginBottom: scale(15),
    marginTop: scale(10),
    borderWidth: scale(1),
    borderColor: '#ccc',
  },
  buttonTxt1: {
    fontSize: moderateScale(12),
    color: 'white',
    fontFamily: 'AvenirHeavy',
  },
  button: {
    backgroundColor: '#333',
    elevation: 5,
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    width: scale(150),
    alignSelf: 'center',
    marginBottom: scale(20),
  },
});
