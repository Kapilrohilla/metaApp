import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Navigation/AuthProvider';
import {ScrollView} from 'react-native-gesture-handler';
import {Checkbox} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppLoading = () => {
  const [screenNum, setScreenNum] = useState(1);
  const nav = useNavigation();
  const {Token} = useContext(AuthContext);
  //const [isPreviouslyAgreed, setIsPreviouslyAgreed] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then(r => {
        // console.log(r);
        // setIsPreviouslyAgreed(true);
        // consolelog(r, ', token');
        if (r) {
          // setScreenNum(1);
        } else {
          setScreenNum(0);
        }
      })
      .catch(err => {
        console.error('err: ' + err);
      });
  }, []);
  return (
    <>
      {screenNum === 0 && <TermCondition setScreenNum={setScreenNum} />}
      {screenNum === 1 && <Splash nav={nav} Token={Token} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default AppLoading;

const Splash = ({nav, Token}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1A1A1A'} />
      <Animatable.View
        animation="bounceInDown"
        iterationCount={1}
        duration={1500}
        delay={200}
        onAnimationEnd={() => {
          if (Token === null) {
            nav.reset({
              index: 0,
              routes: [{name: 'Secondlogin'}],
            });
            // nav.navigate('/');
          } else {
            nav.reset({
              index: 0,
              routes: [{name: 'Drawer'}],
            });
            // nav.navigate('/login');
          }
        }}
        style={{
          color: '#fff',
          fontWeight: '900',
          fontFamily: 'Actor-Regular',
          textAlign: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/icon.png')} style={{width: 80}} resizeMethod="resize" />
        <Text
          style={{
            fontSize: 35,
            fontWeight: '900',
            color: '#fff',
            marginTop: 10,
            fontFamily: 'Actor-Regular',
          }}>
          SkyLark Trade
        </Text>
      </Animatable.View>
    </View>
  );
};

const TermCondition = ({setScreenNum}) => {
  const [isAgree, setIsAgree] = useState(false);
  return (
    <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
      <Text
        style={{
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#ccc',
          alignItems: 'center',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 18,
        }}>
        Privacy Policy
      </Text>
      <ScrollView style={{padding: 10, paddingBottom: 10}}>
        <Text style={{fontSize: 18}}>Welcome to Rapid TRader!</Text>
        <Text style={{fontSize: 16, textAlign: 'justify'}}>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you use our mobile application ("App"). Please read this Privacy Policy carefully. If
          you do not agree with the terms of this Privacy Policy, please do not access the App. We reserve the right to
          make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by
          updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this
          Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to,
          and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the App
          after the date such revised Privacy Policy is posted. Collection of Your Information: We may collect
          information about you in a variety of ways. The information we may collect includes: Personal Data: Personally
          identifiable information, such as your name, email address, and phone number, that you voluntarily give to us
          when you register with the App. Usage Data: Information about your device and internet connection, including
          your IP address, operating system, and browser type. Location Data: We may collect information about your
          location if you enable location services on your device.
        </Text>
        <Text style={{fontSize: 18}}>Use of Your Information:</Text>
        <Text>
          {' '}
          We may use your information to: Provide, maintain, and improve our App; Customize and personalize your
          experience; Monitor the usage of our App; Communicate with you about updates and offers; Detect, prevent, and
          address technical issues. Disclosure of Your Information: We may share your information with third parties
          only as necessary to provide services and features of the App. We may also disclose your information: To
          comply with legal obligations; To protect and defend our rights and property. Security of Your Information: We
          take steps to protect your information from unauthorized access, alteration, disclosure, or destruction.
          However, no method of transmission over the internet or method of electronic storage is 100% secure, and we
          cannot guarantee absolute security. Contact Us: If you have any questions or concerns about this Privacy
          Policy, please contact us at support@rapidtrader.net General Disclaimer: Trading involves risk, including the
          possible loss of principal and other losses. Rapid Trader is not a registered broker-dealer or investment
          adviser and does not provide personalized investment advice. Any investment decisions you make using the
          information provided by Rapid Trader are solely your responsibility. Rapid Trader and its affiliates shall not
          be liable for any damages or losses resulting from the use of the App or reliance on the information provided
          therein. It is recommended that you consult with a qualified financial adviser or broker before making any
          investment decisions
        </Text>
      </ScrollView>
      <View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Checkbox color={'#fff'} onPress={() => setIsAgree(!isAgree)} status={isAgree ? 'checked' : 'unchecked'} />
            <Text onPress={() => setIsAgree(!isAgree)}>I accept Terms and conditions</Text>
          </View>
          <TouchableOpacity
            onPress={() => setScreenNum(1)}
            style={{backgroundColor: '#009247', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 2}}>
            <Text>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
