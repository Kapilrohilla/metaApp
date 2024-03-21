import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;
const DATA = [
  {
    id: 1,
    name: 'TREND',
    AllData: [
      {
        id: 11,
        name: 'Average Directional Movement Index',
      },
      {
        id: 12,
        name: 'Bollinger Brands',
      },
      {
        id: 13,
        name: 'Envelopes',
      },
      {
        id: 14,
        name: 'Ichimoku Kinko Hyo',
      },
      {
        id: 15,
        name: 'Moving Average',
      },
      {
        id: 16,
        name: 'Parabolic SAR',
      },
      {
        id: 17,
        name: 'Standard Deviation',
      },
    ],
  },
  {
    id: 2,
    name: 'OSCILLATORS',
    AllData: [
      {
        id: 21,
        name: 'Average True Range',
      },
      {
        id: 22,
        name: 'Bears Power',
      },
      {
        id: 23,
        name: 'Bulls Power',
      },
      {
        id: 24,
        name: 'Commodity Channel Index',
      },
      {
        id: 25,
        name: 'De Marker',
      },
      {
        id: 26,
        name: 'Force Index',
      },
      {
        id: 27,
        name: 'MACD',
      },
      {
        id: 28,
        name: 'Momentum',
      },
      {
        id: 29,
        name: 'Moving Average Of Oscillator',
      },
      {
        id: 222,
        name: 'Relative Strength Index',
      },
      {
        id: 223,
        name: 'Relative Vigor Index',
      },
      {
        id: 224,
        name: 'Stochastic Oscillator ',
      },
      {
        id: 225,
        name: 'Williams Percent Range',
      },
    ],
  },
  {
    id: 3,
    name: 'VOLUMES',
    AllData: [
      {
        id: 300,
        name: 'Accumulation/Distribution',
      },
      {
        id: 301,
        name: 'Money Flow Index',
      },
      {
        id: 302,
        name: 'On Balance Volume',
      },
      {
        id: 303,
        name: 'Volumes',
      },
    ],
  },
  {
    id: 4,
    name: 'BILL WILLIAMS',
    AllData: [
      {
        id: 400,
        name: 'Accelerator Oscillator',
      },
      {
        id: 401,
        name: 'Alligator',
      },
      {
        id: 402,
        name: 'Awesome Oscillator',
      },
      {
        id: 403,
        name: 'Fractals',
      },
      {
        id: 404,
        name: 'Gator Oscillator',
      },
      {
        id: 404,
        name: 'Market Facilitation Index',
      },
    ],
  },
];

const Indicator = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading, 'loadingSignIn');
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1a1a1a'} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{margin: 10, alignItems: 'center', flexDirection: 'row'}}>
        <AntDesign name="arrowleft" color="#fff" size={25} />
        <Text style={styles.buttonTxt}>Indicator</Text>
      </TouchableOpacity>
      <ScrollView>
        {DATA?.map((item, index) => {
          return (
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  ...styles.buttonTxt,
                  fontSize: 18,
                  fontWeight: '800',
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  borderBottomColor: 'gray',
                }}>
                {item?.name}
              </Text>
              {item?.AllData?.map((items, indexs) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("IndicatorDetails", {data:items?.name})} >
                  <Text
                    style={{
                      ...styles.buttonTxt,
                      fontSize: 14,
                      fontWeight: '800',
                      paddingVertical: 10,
                    }}>
                    {items?.name}
                  </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    height: '100%',
    width: '100%',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Actor-Regular',
    marginLeft: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#ccc',
    backgroundColor: '#1a1a1a',
  },
});
