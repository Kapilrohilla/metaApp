import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'react-native-axios';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Navigation/AuthProvider';
import {useDispatch, useSelector} from 'react-redux';
import {updateBaseUrl} from '../../../ReduxToolkit/slices/baseUrl';
// import {BASEURL} from '@env';

export default function OpenDemoAccount({route}) {
  const navigation = useNavigation();
  const {setToken} = useContext(AuthContext);
  const [isSavedPassword, setIsSavedPassword] = useState(true);
  const [email, setEmail] = useState('');
  let BASEURL = useSelector(state => state.baseUrl);
  const [password, setPassword] = useState('');
  BASEURL = route?.params?.ip;
  const dispatch = useDispatch();
  // console.log(route?.params);
  const isSigninDisabled =
    email !== '' ? (password !== '' ? false : true) : true;
  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: '#E9E9E977',
          borderBottomWidth: 1.5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="left"
            size={30}
            color="#3378C2"
            style={{paddingHorizontal: 10, paddingVertical: 10}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '500',
          }}>
          {/* {'SkyCap Market Ltd.'} */}
          {route?.params?.title}
        </Text>
        <View></View>
      </View>
      <View
        style={[
          styles.bb,
          {paddingTop: 20, paddingBottom: 5, paddingHorizontal: 20},
        ]}>
        <Text style={{textTransform: 'uppercase', color: '#fff'}}>
          Register a new account
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('NewAccountRegister', {
            ip: BASEURL,
            title: route?.params?.title,
          })
        }
        style={[
          {
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          styles.bb,
        ]}>
        <View style={{paddingVertical: 10, gap: 3}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
            Demo Account
          </Text>
          <Text style={{color: '#fff'}}>
            {'Register an account to learn trading and test\nyour statergies.'}
          </Text>
        </View>
        <AntDesign name="right" color="#E9E9E977" size={20} />
      </TouchableOpacity>
      <View style={[styles.bb, {paddingVertical: 10}]}>
        <Text
          style={{
            textTransform: 'uppercase',
            paddingHorizontal: 20,
            color: '#fff',
          }}>
          User Existing account
        </Text>
      </View>
      <View style={[styles.between, styles.ph, styles.pv, styles.bb]}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
          Server
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>
          {/* SkyCap Market */}
          {route?.params?.title}
        </Text>
      </View>
      <View style={[styles.between, styles.ph, styles.pv, styles.bb]}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
          Login
        </Text>
        {/* <Text style={{fontSize: 16, fontWeight: '500'}}>Enter login</Text> */}
        <TextInput
          style={{
            fontSize: 16,
            fontWeight: '500',
            padding: 0,
            width: Dimensions.get('window').width * 0.5,
          }}
          value={email}
          onChangeText={text => setEmail(text)}
          textAlign="right"
          placeholderTextColor={'#808080'}
          placeholder="Enter Login"
        />
      </View>
      <View style={[styles.between, styles.ph, styles.pv, styles.bb]}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
          Password
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            fontWeight: '500',
            padding: 0,
            width: Dimensions.get('window').width * 0.5,
          }}
          textAlign="right"
          placeholderTextColor={'#808080'}
          placeholder="Enter Password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {/* <View style={[styles.between, styles.ph, styles.pv, styles.bb]}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>Save password</Text>
        <Switch
          value={isSavedPassword}
          onValueChange={() => {
            setIsSavedPassword(!isSavedPassword);
          }}
          thumbColor={'#fff'}
          trackColor={'#00ff00'}
        />
      </View> */}

      <TouchableOpacity
        disabled={isSigninDisabled}
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#333',
          width: '100%',
          padding: 15,
        }}
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
                email: email,
                password: password,
              }),
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then(response => {
              console.log(response?.data, '/SignIn');
              if (response?.data?.status) {
                AsyncStorage.setItem('userToken', response?.data?.token);
                setToken(response?.data?.token);
                AsyncStorage.setItem('baseUrl', BASEURL);
                dispatch(updateBaseUrl(BASEURL));
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
              // Handle error
              console.log('Error occurred: ');
              console.log(error);
            });
        }}>
        <Text
          style={{
            color: '#fff',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: '700',
          }}>
          Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  bb: {
    borderBottomColor: '#E9E9E977',
    borderBottomWidth: 1.5,
  },
  ph: {
    paddingHorizontal: 20,
  },
  pv: {
    paddingVertical: 10,
  },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
