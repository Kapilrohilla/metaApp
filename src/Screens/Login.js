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
} from 'react-native';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Navigation/AuthProvider';
const Login = () => {
  const {SignUp} = useContext(AuthContext);
  const navigation = useNavigation();
  const [houseNumber, setHouseNumber] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');

  //   const LoginAuth = async type => {
  //     await axios
  //       .post(
  //         'http://65.0.59.137:8080/signup',
  //         JSON.stringify({
  //           name: houseNumber,
  //           email: locality,
  //           password: landmark,
  //         }),
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       )
  //       .then(response => {
  //         console?.log(response, 'LoginAuth');
  //         if (response?.status === 200) {
  //         }
  //       })
  //       .catch(error => {
  //         if (error) {
  //           // console?.log(error, ',,,,,,,,,,,,,,,');
  //         }
  //       });
  //   };

  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 15, backgroundColor: '#1a1a1a'}}>
      <TouchableOpacity
        style={{position: 'absolute', top: 15, left: 15, zIndex: 1000}}
        onPress={() => navigation.goBack()}></TouchableOpacity>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: '#fff',
            fontFamily: 'AvenirMedium',
            fontWeight: '800',
          }}>
          Sign Up
        </Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Text
          style={{
            fontSize: moderateScale(14),
            fontFamily: 'AvenirBlack',
            color: '#fff',
            marginTop: scale(20),
          }}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            setHouseNumber(e);
          }}
          value={houseNumber}
          placeholder="Type your full name"
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
          E-mail
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            setLocality(e);
          }}
          value={locality}
          placeholder="Type Your Email"
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
          {/* Password */}
          Phone
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            setLandmark(e);
          }}
          value={landmark}
          placeholder="Type your mobile number."
          keyboardType="default"
          placeholderTextColor={'#C4C4C4'}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Secondlogin')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scale(40),
          }}>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: 'AvenirBlack',
              color: '#fff',
              marginBottom: scale(10),
            }}>
            Already have an account?
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: 'AvenirBlack',
              color: '#fff',
              marginBottom: scale(10),
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {landmark?.length > 0 &&
      locality?.length > 0 &&
      houseNumber?.length > 0 ? (
        <TouchableOpacity
          onPress={() => SignUp(houseNumber, locality, landmark)}
          style={styles.button}>
          <Text style={styles.buttonTxt1}>Sign Up</Text>
        </TouchableOpacity>
      ) : (
        <View style={{...styles.button, opacity: 0.6}}>
          <Text style={styles.buttonTxt1}>Sign Up</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

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
    backgroundColor: '#ccc',
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
