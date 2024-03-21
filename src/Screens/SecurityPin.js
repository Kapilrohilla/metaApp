import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';

const SecurityPin = ({route}) => {
  const navigation = useNavigation();
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const veryfiOtp = pin1 + pin2 + pin3 + pin4;

  const styles = StyleSheet.create({
    contentScroll: {
      flex: 1,
      backgroundColor: '#1A1A1A',
      // borderWidth: 1, borderColor: '#fff'
    },
    backButton: {
      top: moderateScale(15),
      backgroundColor: '#fff',
      height: moderateScale(35),
      width: moderateScale(35),
      borderRadius: moderateScale(30),
      justifyContent: 'center',
      alignItems: 'center',
      left: moderateScale(15),
    },
    customTitleHalf1: {
      color: '#000',
      fontSize: moderateScale(16),
      fontWeight: '700',
      marginTop: moderateScale(-15),
      marginBottom: moderateScale(15),
      fontFamily: 'Inter-Bold',
    },
    buttonTxt: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '400',
      fontFamily: 'Actor-Regular',
      marginLeft: 10,
    },
  });

  return (
    <>
      <SafeAreaView style={styles.contentScroll}>
        <StatusBar animated={true} backgroundColor="#1A1A1A" />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{margin: 10, alignItems: 'center', flexDirection: 'row'}}>
          <AntDesign name="arrowleft" color="#fff" size={25} />
          <View style ={{flexDirection:"column"}} >
          <Text style={styles.buttonTxt}>OTP</Text>
          <Text style={{...styles.buttonTxt, color:"gray"}}>Authorization</Text>
          </View>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={{
            marginTop: moderateScale(20),
            marginHorizontal: moderateScale(20),
          }}>
          <Text
            style={{
              fontSize: moderateScale(18),
              fontWeight: '800',
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Inter-SemiBold',
              marginVertical: moderateScale(30),
            }}>
            Confirm Your PIN
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: moderateScale(15),
            }}>
            <View
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#fff',
                marginHorizontal: moderateScale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                  alignSelf: 'center',
                }}>
                {pin1}
              </Text>
            </View>
            <View
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#fff',
                marginHorizontal: moderateScale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                  alignSelf: 'center',
                }}>
                {pin2}
              </Text>
            </View>
            <View
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#fff',
                marginHorizontal: moderateScale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                  alignSelf: 'center',
                }}>
                {pin3}
              </Text>
            </View>
            <View
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#fff',
                marginHorizontal: moderateScale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                  alignSelf: 'center',
                }}>
                {pin4}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: moderateScale(15),
              marginHorizontal: moderateScale(20),
              marginTop: moderateScale(40),
            }}>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('1');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('1');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('1');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('1');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('2');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('2');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('2');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('2');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('3');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('3');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('3');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('3');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                3
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: moderateScale(15),
              marginHorizontal: moderateScale(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('4');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('4');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('4');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('4');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('5');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('5');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('5');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('5');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('6');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('6');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('6');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('6');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                6
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: moderateScale(15),
              marginHorizontal: moderateScale(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('7');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('7');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('7');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('7');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                7
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('8');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('8');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('8');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('8');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                8
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('9');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('9');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('9');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('9');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                9
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: moderateScale(15),
              marginHorizontal: moderateScale(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                if (pin1 !== '' && pin2 !== '' && pin3 !== '' && pin4 !== '') {
                  setPin4('');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin3('');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin1('');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="delete" color={'red'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (pin1 === '' && pin2 === '' && pin3 === '' && pin4 === '') {
                  setPin1('0');
                } else if (
                  pin1 !== '' &&
                  pin2 === '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin2('0');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 === '' &&
                  pin4 === ''
                ) {
                  setPin3('0');
                } else if (
                  pin1 !== '' &&
                  pin2 !== '' &&
                  pin3 !== '' &&
                  pin4 === ''
                ) {
                  setPin4('0');
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#777E90',
                  fontSize: moderateScale(20),
                  fontWeight: '600',
                  fontFamily: 'Inter-SemiBold',
                }}>
                0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (veryfiOtp === route?.params?.otp) {
                  Add_Pin();
                }
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(40),
                borderWidth: moderateScale(1),
                borderColor: '#B1B5C3',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign
                name="check"
                color={'green'}
                size={moderateScale(20)}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SecurityPin;
